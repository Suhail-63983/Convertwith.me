import type { ConverterModule } from "$lib/utils/converterRouter";

/**
 * PDF → DOCX converter
 * Pipeline: PDF → text extraction (via pdfjs-dist) → DOCX generation (via docx npm package)
 *
 * This is a fully client-side approach. It extracts text content from each PDF
 * page and creates a properly structured .docx file with page breaks between pages.
 * Complex formatting (columns, images, tables) won't be preserved, but text content
 * and basic paragraph structure will be maintained.
 */

let pdfjsLoaded = false;
let pdfjsLib: any = null;

async function ensurePdfjs(): Promise<any> {
  if (pdfjsLoaded && pdfjsLib) return pdfjsLib;

  pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";

  pdfjsLoaded = true;
  return pdfjsLib;
}

export const pdfToDocxConverter: ConverterModule = {
  libraryName: "pdf-to-docx",

  async init(): Promise<void> {
    await ensurePdfjs();
  },

  async convert(
    file: File,
    fromFormat: string,
    toFormat: string,
  ): Promise<{ blob: Blob; filename: string }> {
    if (fromFormat !== "pdf" || toFormat !== "docx") {
      throw new Error(
        `PDF-to-DOCX converter only supports pdf-to-docx, got ${fromFormat}-to-${toFormat}`,
      );
    }

    const pdfjs = await ensurePdfjs();
    const docx = await import("docx");

    // Step 1: Load and parse the PDF
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;

    // Step 2: Extract text from every page
    const pageContents: string[][] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Group text items into lines based on Y position
      const lines: Map<number, string[]> = new Map();

      for (const item of textContent.items) {
        if ("str" in item && item.str) {
          // Round Y to group nearby text on same line
          const y = Math.round((item as any).transform[5]);
          if (!lines.has(y)) {
            lines.set(y, []);
          }
          lines.get(y)!.push(item.str);
        }
      }

      // Sort lines by Y position (descending, since PDF Y goes bottom-up)
      const sortedYs = [...lines.keys()].sort((a, b) => b - a);
      const paragraphs = sortedYs.map((y) => lines.get(y)!.join(" ").trim()).filter((l) => l.length > 0);

      pageContents.push(paragraphs);
    }

    // Step 3: Build the DOCX document
    const children: any[] = [];

    for (let i = 0; i < pageContents.length; i++) {
      const paragraphs = pageContents[i];

      for (const text of paragraphs) {
        children.push(
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: text,
                size: 24, // 12pt in half-points
                font: "Calibri",
              }),
            ],
            spacing: { after: 120 },
          }),
        );
      }

      // Add page break between pages (not after the last page)
      if (i < pageContents.length - 1) {
        children.push(
          new docx.Paragraph({
            children: [],
            pageBreakBefore: true,
          }),
        );
      }
    }

    // If no text was extracted, add a notice
    if (children.length === 0) {
      children.push(
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: "No text content could be extracted from this PDF. The PDF may contain only images or scanned content.",
              size: 24,
              font: "Calibri",
              italics: true,
              color: "666666",
            }),
          ],
        }),
      );
    }

    const doc = new docx.Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440,    // 1 inch in twips
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children,
        },
      ],
    });

    // Step 4: Generate the .docx blob
    const docxBlob = await docx.Packer.toBlob(doc);
    const blob = new Blob([docxBlob], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const filename = `${baseName}.docx`;

    return { blob, filename };
  },
};
