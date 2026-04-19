const SUPPORTED_CONVERSIONS = {
  "jpg-to-png": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "jpg-to-webp": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "jpg-to-gif": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "png-to-jpg": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "png-to-webp": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "webp-to-jpg": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "webp-to-png": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "gif-to-png": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "gif-to-jpg": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "heic-to-jpg": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "heic-to-png": () => import("./imageConverter.js").then((m) => m.imageConverter),
  "pdf-to-docx": () => import("./docConverter.js").then((m) => m.docConverter),
  "docx-to-pdf": () => import("./docConverter.js").then((m) => m.docConverter),
  "docx-to-html": () => import("./mammothConverter.js").then((m) => m.mammothConverter),
  "pdf-to-jpg": () => import("./pdfToImageConverter.js").then(
    (m) => m.pdfToImageConverter
  ),
  "pdf-to-png": () => import("./pdfToImageConverter.js").then(
    (m) => m.pdfToImageConverter
  ),
  "jpg-to-pdf": () => import("./imageToPdfConverter.js").then(
    (m) => m.imageToPdfConverter
  ),
  "png-to-pdf": () => import("./imageToPdfConverter.js").then(
    (m) => m.imageToPdfConverter
  )
};
const LIBRARY_MAP = {
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
  "pdf-to-docx": "pandoc",
  "docx-to-pdf": "pandoc",
  "docx-to-html": "mammoth",
  "pdf-to-jpg": "pdfjs",
  "pdf-to-png": "pdfjs",
  "jpg-to-pdf": "pdflib",
  "png-to-pdf": "pdflib"
};
function getConverter(slug) {
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
    load: loader
  };
}
function getAllSlugs() {
  return Object.keys(SUPPORTED_CONVERSIONS);
}
export {
  getConverter as a,
  getAllSlugs as g
};
