import type { ConverterModule } from "$lib/utils/converterRouter";

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

export const pdfToImageConverter: ConverterModule = {
  libraryName: "pdfjs",

  async init(): Promise<void> {
    await ensurePdfjs();
  },

  async convert(
    file: File,
    fromFormat: string,
    toFormat: string,
  ): Promise<{ blob: Blob; filename: string }> {
    if (fromFormat !== "pdf" || (toFormat !== "jpg" && toFormat !== "png")) {
      throw new Error(
        `PDF-to-image converter only supports pdf-to-jpg/png, got ${fromFormat}-to-${toFormat}`,
      );
    }

    const pdfjs = await ensurePdfjs();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

    const numPages = pdf.numPages;
    const page = await pdf.getPage(1);

    const scale = 2.0;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const ctx = canvas.getContext("2d")!;

    await page.render({
      canvasContext: ctx,
      viewport: viewport,
    }).promise;

    const mimeType = toFormat === "jpg" ? "image/jpeg" : "image/png";
    const quality = toFormat === "jpg" ? 0.92 : undefined;

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b: Blob | null) => resolve(b!), mimeType, quality);
    });

    const baseName = file.name.replace(/\.[^.]+$/, "");
    const ext = toFormat === "jpg" ? "jpg" : "png";
    const filename =
      numPages > 1 ? `${baseName}-page1.${ext}` : `${baseName}.${ext}`;

    return { blob, filename };
  },
};
