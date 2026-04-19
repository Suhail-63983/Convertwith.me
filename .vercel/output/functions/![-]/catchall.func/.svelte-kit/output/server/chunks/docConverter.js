let pandocLoaded = false;
let pandocInstance = null;
async function ensurePandoc() {
  if (pandocLoaded && pandocInstance) return pandocInstance;
  const scriptUrl = "https://cdn.jsdelivr.net/npm/pandoc-wasm@0.1.3/dist/pandoc.mjs";
  const pandocModule = await import(
    /* @vite-ignore */
    scriptUrl
  );
  const instance = await pandocModule.default();
  pandocInstance = instance;
  pandocLoaded = true;
  return instance;
}
const docConverter = {
  libraryName: "pandoc",
  async init() {
    await ensurePandoc();
  },
  async convert(file, fromFormat, toFormat) {
    const pandoc = await ensurePandoc();
    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    let inputFormat;
    let outputFormat;
    let outputExtension;
    let mimeType;
    if (fromFormat === "pdf" && toFormat === "docx") {
      inputFormat = "pdf";
      outputFormat = "docx";
      outputExtension = "docx";
      mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else if (fromFormat === "docx" && toFormat === "pdf") {
      inputFormat = "docx";
      outputFormat = "pdf";
      outputExtension = "pdf";
      mimeType = "application/pdf";
    } else {
      throw new Error(
        `Pandoc converter does not support ${fromFormat}-to-${toFormat}`
      );
    }
    const result = pandoc.convert(uint8, {
      from: inputFormat,
      to: outputFormat
    });
    if (!result || !result.output) {
      throw new Error("Pandoc conversion failed: no output generated");
    }
    const blob = new Blob([result.output], { type: mimeType });
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const filename = `${baseName}.${outputExtension}`;
    return { blob, filename };
  }
};
export {
  docConverter
};
