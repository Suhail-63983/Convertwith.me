<svelte:head>
	<title>About FileConvert — Privacy-First File Converter</title>
	<meta name="description" content="Learn about FileConvert — a privacy-first, client-side file converter that processes all files locally in your browser using WebAssembly." />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-16">
	<h1 class="text-3xl font-bold text-gray-900 mb-8">About FileConvert</h1>

	<div class="prose prose-gray max-w-none">
		<p class="text-gray-600 mb-6 text-lg">
			FileConvert is a privacy-first file conversion tool that runs entirely in your browser. No uploads, no tracking, no limits.
		</p>

		<h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
		<p class="text-gray-600 mb-4">
			We believe file conversion should be simple, fast, and private. Most online converters upload your files to their servers, store them temporarily (or permanently), and track your usage. FileConvert does the opposite: every conversion happens on your device, using your device's processing power.
		</p>

		<h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">How It Works</h2>
		<p class="text-gray-600 mb-4">
			FileConvert uses WebAssembly (WASM) to run powerful conversion libraries directly in your browser. These are the same libraries used by desktop applications — ImageMagick for image conversions, Pandoc for document conversions, PDF.js for PDF rendering, and pdf-lib for PDF creation. The difference is that we run them in your browser instead of on a server.
		</p>
		<p class="text-gray-600 mb-4">
			Each converter page only loads the specific library it needs. Image converters load ImageMagick, document converters load Pandoc, and so on. This means you're never downloading libraries you don't need. Libraries are cached after the first download for instant access on repeat visits.
		</p>

		<h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Supported Conversions</h2>
		<ul class="list-disc list-inside text-gray-600 mb-4 space-y-1">
			<li><strong>Image conversions:</strong> JPG, PNG, WebP, GIF, HEIC — convert between any supported format</li>
			<li><strong>Document conversions:</strong> PDF to DOCX, DOCX to PDF, DOCX to HTML</li>
			<li><strong>PDF conversions:</strong> PDF to JPG, PDF to PNG, JPG to PDF, PNG to PDF</li>
		</ul>

		<h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Privacy & Security</h2>
		<p class="text-gray-600 mb-4">
			Your files never leave your device. Period. The conversion code runs in an isolated browser context, and no file data is ever transmitted over the network. We use HTTPS and Cross-Origin isolation headers for maximum security. We use Plausible Analytics (privacy-preserving, no cookies) for basic usage statistics.
		</p>

		<h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Open Source</h2>
		<p class="text-gray-600 mb-4">
			FileConvert is built with open-source technologies: SvelteKit, TailwindCSS, ImageMagick WASM, Pandoc WASM, PDF.js, pdf-lib, and mammoth.js. We believe in transparency and open source.
		</p>
	</div>
</div>
