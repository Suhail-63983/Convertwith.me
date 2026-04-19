let imagemagickLoaded = false;
async function ensureImageMagick() {
  if (imagemagickLoaded) return;
  const { initializeImageMagick } = await import("@imagemagick/magick-wasm");
  await initializeImageMagick(
    new URL(
      "https://cdn.jsdelivr.net/npm/@imagemagick/magick-wasm@0.0.35/dist/magick.wasm"
    )
  );
  imagemagickLoaded = true;
}
function getMimeType(format) {
  const mimeMap = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    heic: "image/heic",
    heif: "image/heic"
  };
  return mimeMap[format.toLowerCase()] || "application/octet-stream";
}
const FORMAT_TO_MAGICK = {
  jpg: "Jpeg",
  jpeg: "Jpeg",
  png: "Png",
  webp: "WebP",
  gif: "Gif",
  heic: "Heic",
  heif: "Heif"
};
const imageConverter = {
  libraryName: "imagemagick",
  async init() {
    await ensureImageMagick();
  },
  async convert(file, fromFormat, toFormat) {
    await ensureImageMagick();
    const { ImageMagick, MagickFormat } = await import("@imagemagick/magick-wasm");
    const arrayBuffer = await file.arrayBuffer();
    const inputBytes = new Uint8Array(arrayBuffer);
    const magickKey = FORMAT_TO_MAGICK[toFormat.toLowerCase()];
    if (!magickKey) {
      throw new Error(`Unsupported output format: ${toFormat}`);
    }
    const formatValue = MagickFormat[magickKey];
    if (!formatValue) {
      throw new Error(`Unsupported MagickFormat key: ${magickKey}`);
    }
    const outputBytes = await new Promise((resolve, reject) => {
      ImageMagick.read(inputBytes, (image) => {
        image.write(formatValue, (output) => {
          resolve(output);
        });
      });
    });
    const mimeType = getMimeType(toFormat);
    const blob = new Blob([outputBytes.buffer], {
      type: mimeType
    });
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const filename = `${baseName}.${toFormat}`;
    return { blob, filename };
  }
};
export {
  imageConverter
};
