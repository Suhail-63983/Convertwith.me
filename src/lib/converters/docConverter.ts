import type { ConverterModule } from "$lib/utils/converterRouter";

let pandocLoaded = false;
let pandocInstance: any = null;

async function ensurePandoc(): Promise<any> {
  if (pandocLoaded && pandocInstance) return pandocInstance;

	const scriptUrl = 'https://esm.run/pandoc-wasm@1.0.1';
	const pandocModule: any = await import(/* @vite-ignore */ scriptUrl);

	pandocInstance = pandocModule;
	pandocLoaded = true;

	return pandocInstance;
}

export const docConverter: ConverterModule = {
  libraryName: "pandoc",

  async init(): Promise<void> {
    await ensurePandoc();
  },

  async convert(
    file: File,
    fromFormat: string,
    toFormat: string,
  ): Promise<{ blob: Blob; filename: string }> {
    const pandoc = await ensurePandoc();

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);

    let inputFormat: string;
    let outputFormat: string;
    let outputExtension: string;
    let mimeType: string;

    if (fromFormat === "pdf" && toFormat === "docx") {
      inputFormat = "pdf";
      outputFormat = "docx";
      outputExtension = "docx";
      mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else if (fromFormat === "docx" && toFormat === "pdf") {
      inputFormat = "docx";
      outputFormat = "pdf";
      outputExtension = "pdf";
      mimeType = "application/pdf";
    } else {
      throw new Error(
        `Pandoc converter does not support ${fromFormat}-to-${toFormat}`,
      );
    }

		const baseName = file.name.replace(/\.[^.]+$/, '');
		const filename = `${baseName}.${outputExtension}`;

		// Provide the binary file as a resource and command pandoc to read from it
		const result = await pandoc.pandoc(
			`-f ${inputFormat} -t ${outputFormat} -o ${filename} input_file`,
			null,
			[{ filename: 'input_file', contents: file }]
		);

		if (!result || !result.out) {
			throw new Error('Pandoc conversion failed: no output generated');
		}

		// The output is either a string or a Blob
		const outputData = result.out instanceof Blob ? result.out : new Blob([result.out], { type: mimeType });
		const blob = new Blob([outputData], { type: mimeType });

		return { blob, filename };
  },
};
