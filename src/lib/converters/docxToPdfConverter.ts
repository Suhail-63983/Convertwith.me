import type { ConverterModule } from "$lib/utils/converterRouter";

/**
 * DOCX → PDF converter
 * Pipeline: DOCX → HTML (via mammoth.js) → PDF (via jsPDF + html2canvas)
 *
 * This is a fully client-side approach that doesn't require pandoc or LaTeX.
 * Mammoth extracts semantic HTML from the DOCX, which is then rendered in
 * a hidden container and captured as a PDF.
 */
export const docxToPdfConverter: ConverterModule = {
  libraryName: "docx-to-pdf",

  async init(): Promise<void> {
    // Lazy-load on first use, nothing to pre-initialize
  },

  async convert(
    file: File,
    fromFormat: string,
    toFormat: string,
  ): Promise<{ blob: Blob; filename: string }> {
    if (fromFormat !== "docx" || toFormat !== "pdf") {
      throw new Error(
        `DOCX-to-PDF converter only supports docx-to-pdf, got ${fromFormat}-to-${toFormat}`,
      );
    }

    // Step 1: Convert DOCX to HTML using mammoth
    const mammoth = await import("mammoth");
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.convertToHtml({ arrayBuffer });
    if (result.messages && result.messages.length > 0) {
      console.warn("Mammoth warnings:", result.messages);
    }

    const htmlContent = result.value;

    // Step 2: Render HTML into a hidden container
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: 794px;
      background: white;
      color: black;
      font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      padding: 40px 50px;
    `;

    // Add styling for the rendered HTML
    container.innerHTML = `
      <style>
        * { box-sizing: border-box; }
        h1 { font-size: 20pt; margin: 16px 0 8px; font-weight: bold; }
        h2 { font-size: 16pt; margin: 14px 0 8px; font-weight: bold; }
        h3 { font-size: 14pt; margin: 12px 0 6px; font-weight: bold; }
        p { margin: 0 0 8px; }
        ul, ol { margin: 0 0 8px; padding-left: 24px; }
        table { border-collapse: collapse; width: 100%; margin: 8px 0; }
        td, th { border: 1px solid #999; padding: 6px 8px; text-align: left; font-size: 11pt; }
        th { background: #f0f0f0; font-weight: bold; }
        img { max-width: 100%; height: auto; }
        blockquote { border-left: 3px solid #ccc; margin: 8px 0; padding-left: 12px; color: #555; }
      </style>
      ${htmlContent}
    `;
    document.body.appendChild(container);

    try {
      // Step 3: Capture with html2canvas
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: 794,
        windowWidth: 794,
      });

      // Step 4: Create PDF with jsPDF
      const { jsPDF } = await import("jspdf");

      // A4 dimensions in mm: 210 x 297
      const pageWidthMm = 210;
      const pageHeightMm = 297;
      const marginMm = 10;
      const contentWidthMm = pageWidthMm - 2 * marginMm;
      const contentHeightMm = pageHeightMm - 2 * marginMm;

      // Calculate how many pages we need
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;
      const scaleFactor = contentWidthMm / imgWidthPx;
      const totalHeightMm = imgHeightPx * scaleFactor;
      const pageCount = Math.ceil(totalHeightMm / contentHeightMm);

      const pdf = new jsPDF("p", "mm", "a4");

      for (let page = 0; page < pageCount; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        // Calculate the source rectangle for this page
        const srcY = (page * contentHeightMm) / scaleFactor;
        const srcHeight = Math.min(
          contentHeightMm / scaleFactor,
          imgHeightPx - srcY,
        );

        if (srcHeight <= 0) break;

        // Create a canvas for this page slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidthPx;
        pageCanvas.height = Math.ceil(srcHeight);
        const pageCtx = pageCanvas.getContext("2d")!;
        pageCtx.drawImage(
          canvas,
          0,
          srcY,
          imgWidthPx,
          srcHeight,
          0,
          0,
          imgWidthPx,
          srcHeight,
        );

        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
        const renderHeight = srcHeight * scaleFactor;

        pdf.addImage(
          pageImgData,
          "JPEG",
          marginMm,
          marginMm,
          contentWidthMm,
          renderHeight,
        );
      }

      const pdfBlob = pdf.output("blob");
      const baseName = file.name.replace(/\.[^.]+$/, "");
      const filename = `${baseName}.pdf`;

      return { blob: pdfBlob, filename };
    } finally {
      // Always clean up the hidden container
      document.body.removeChild(container);
    }
  },
};
