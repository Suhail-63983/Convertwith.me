import type { ConverterModule } from "$lib/utils/converterRouter";

export const mammothConverter: ConverterModule = {
  libraryName: "mammoth",

  async init(): Promise<void> {},

  async convert(
    file: File,
    fromFormat: string,
    toFormat: string,
  ): Promise<{ blob: Blob; filename: string }> {
    if (fromFormat !== "docx" || toFormat !== "html") {
      throw new Error(
        `Mammoth converter only supports docx-to-html, got ${fromFormat}-to-${toFormat}`,
      );
    }

    const mammoth = await import("mammoth");

    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.convertToHtml({ arrayBuffer });

    if (result.messages && result.messages.length > 0) {
      console.warn("Mammoth warnings:", result.messages);
    }

    const htmlContent = result.value;
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Converted Document</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #333; }
img { max-width: 100%; height: auto; }
table { border-collapse: collapse; width: 100%; }
td, th { border: 1px solid #ddd; padding: 8px; }
</style>
</head>
<body>
${htmlContent}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: "text/html" });
    const baseName = file.name.replace(/\.[^.]+$/, "");
    const filename = `${baseName}.html`;

    return { blob, filename };
  },
};
