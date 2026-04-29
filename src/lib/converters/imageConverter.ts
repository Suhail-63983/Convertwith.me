import type { ConverterModule } from "$lib/utils/converterRouter";

let imagemagickLoaded = false;

async function ensureImageMagick(): Promise<void> {
  if (imagemagickLoaded) return;

  const { initializeImageMagick } = await import("@imagemagick/magick-wasm");

  // Fetch the WASM binary as raw bytes — passing a URL object is unreliable.
  // The upstream VERT project also fetches the binary and passes Uint8Array.
  const wasmResponse = await fetch(
    "https://cdn.jsdelivr.net/npm/@imagemagick/magick-wasm@0.0.35/dist/magick.wasm",
  );
  if (!wasmResponse.ok) {
    throw new Error(
      `Failed to fetch ImageMagick WASM: ${wasmResponse.status} ${wasmResponse.statusText}`,
    );
  }
  const wasmBytes = new Uint8Array(await wasmResponse.arrayBuffer());

  await initializeImageMagick(wasmBytes);

  imagemagickLoaded = true;
}

function getMimeType(format: string): string {
  const mimeMap: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    bmp: "image/bmp",
    tiff: "image/tiff",
    tif: "image/tiff",
    ico: "image/x-icon",
    heic: "image/heic",
    heif: "image/heic",
  };
  return mimeMap[format.toLowerCase()] || "application/octet-stream";
}

export const imageConverter: ConverterModule = {
  libraryName: "imagemagick",

  async init(): Promise<void> {
    await ensureImageMagick();
  },

  async convert(
    file: File,
    fromFormat: string,
    toFormat: string,
  ): Promise<{ blob: Blob; filename: string }> {
    await ensureImageMagick();

    const { ImageMagick, MagickFormat } =
      await import("@imagemagick/magick-wasm");

    const arrayBuffer = await file.arrayBuffer();
    const inputBytes = new Uint8Array(arrayBuffer);

    // Build a case-insensitive lookup from MagickFormat enum keys.
    const lookup = Object.fromEntries(
      Object.entries(MagickFormat as Record<string, string>).map(([k, v]) => [k.toLowerCase(), v])
    );
    const formatValue = lookup[toFormat.toLowerCase()];

    if (!formatValue) {
      throw new Error(`Unsupported output format: ${toFormat}`);
    }

    // CRITICAL FIX: The Uint8Array provided in the image.write() callback is
    // a VIEW into WASM heap memory. Once the callback returns, that memory is
    // reclaimed/overwritten by ImageMagick. We MUST copy the data out
    // immediately using structuredClone() or new Uint8Array(output).
    // See: https://github.com/VERT-sh/VERT/blob/main/src/lib/workers/magick.ts
    const outputBytes = await new Promise<Uint8Array>((resolve, reject) => {
      try {
        ImageMagick.read(inputBytes, (image) => {
          image.write(formatValue as unknown as typeof MagickFormat[keyof typeof MagickFormat], (output: Uint8Array) => {
            // Copy the data out of WASM memory immediately
            resolve(new Uint8Array(output));
          });
        });
      } catch (e) {
        reject(e);
      }
    });

    const mimeType = getMimeType(toFormat);
    // Create the Blob directly from the copied Uint8Array, NOT from .buffer
    // (which may reference the entire WASM heap ArrayBuffer)
    const blob = new Blob([outputBytes], {
      type: mimeType,
    });
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const filename = `${baseName}.${toFormat}`;

    return { blob, filename };
  },
};
