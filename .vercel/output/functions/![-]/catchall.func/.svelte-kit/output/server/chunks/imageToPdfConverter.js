const imageToPdfConverter = {
  libraryName: "pdflib",
  async init() {
  },
  async convert(file, fromFormat, toFormat) {
    if (toFormat !== "pdf" || fromFormat !== "jpg" && fromFormat !== "png" && fromFormat !== "jpeg") {
      throw new Error(
        `Image-to-PDF converter only supports jpg/png-to-pdf, got ${fromFormat}-to-${toFormat}`
      );
    }
    const { PDFDocument } = await import("pdf-lib");
    const arrayBuffer = await file.arrayBuffer();
    let image;
    const isJpg = fromFormat === "jpg" || fromFormat === "jpeg";
    const pdfDoc = await PDFDocument.create();
    if (isJpg) {
      image = await pdfDoc.embedJpg(arrayBuffer);
    } else {
      image = await pdfDoc.embedPng(arrayBuffer);
    }
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height
    });
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes.buffer], {
      type: "application/pdf"
    });
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const filename = `${baseName}.pdf`;
    return { blob, filename };
  }
};
export {
  imageToPdfConverter
};
