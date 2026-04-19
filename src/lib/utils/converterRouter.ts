export interface ConverterModule {
  libraryName: string;
  init: () => Promise<void>;
  convert: (
    file: File,
    fromFormat: string,
    toFormat: string,
  ) => Promise<{
    blob: Blob;
    filename: string;
  }>;
}

export interface ConverterInfo {
  libraryName: "imagemagick" | "mammoth" | "pdfjs" | "pdflib";
  fromFormat: string;
  toFormat: string;
  load: () => Promise<ConverterModule>;
}

const SUPPORTED_CONVERSIONS: Record<string, () => Promise<ConverterModule>> = {
  // Image-to-image (ImageMagick WASM)
  "jpg-to-png": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),
  "jpg-to-webp": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),
  "jpg-to-gif": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),
  "png-to-jpg": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),
  "png-to-webp": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),
  "webp-to-jpg": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),
  "webp-to-png": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),
  "gif-to-png": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),
  "gif-to-jpg": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),
  "heic-to-jpg": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),
  "heic-to-png": () =>
    import("$lib/converters/imageConverter").then((m) => m.imageConverter),

  // DOCX-to-HTML (mammoth — reliable, no WASM needed)
  "docx-to-html": () =>
    import("$lib/converters/mammothConverter").then((m) => m.mammothConverter),

  // PDF-to-Image (pdfjs-dist)
  "pdf-to-jpg": () =>
    import("$lib/converters/pdfToImageConverter").then(
      (m) => m.pdfToImageConverter,
    ),
  "pdf-to-png": () =>
    import("$lib/converters/pdfToImageConverter").then(
      (m) => m.pdfToImageConverter,
    ),

  // Image-to-PDF (pdf-lib — lightweight, no WASM)
  "jpg-to-pdf": () =>
    import("$lib/converters/imageToPdfConverter").then(
      (m) => m.imageToPdfConverter,
    ),
  "png-to-pdf": () =>
    import("$lib/converters/imageToPdfConverter").then(
      (m) => m.imageToPdfConverter,
    ),
};

const LIBRARY_MAP: Record<string, ConverterInfo["libraryName"]> = {
  "jpg-to-png": "imagemagick",
  "jpg-to-webp": "imagemagick",
  "jpg-to-gif": "imagemagick",
  "png-to-jpg": "imagemagick",
  "png-to-webp": "imagemagick",
  "webp-to-jpg": "imagemagick",
  "webp-to-png": "imagemagick",
  "gif-to-png": "imagemagick",
  "gif-to-jpg": "imagemagick",
  "heic-to-jpg": "imagemagick",
  "heic-to-png": "imagemagick",
  "docx-to-html": "mammoth",
  "pdf-to-jpg": "pdfjs",
  "pdf-to-png": "pdfjs",
  "jpg-to-pdf": "pdflib",
  "png-to-pdf": "pdflib",
};

export function getConverter(slug: string): ConverterInfo | null {
  const loader = SUPPORTED_CONVERSIONS[slug];
  if (!loader) return null;

  const parts = slug.split("-to-");
  if (parts.length !== 2) return null;

  const libraryName = LIBRARY_MAP[slug];
  if (!libraryName) return null;

  return {
    libraryName,
    fromFormat: parts[0],
    toFormat: parts[1],
    load: loader,
  };
}

export function getAllSlugs(): string[] {
  return Object.keys(SUPPORTED_CONVERSIONS);
}
