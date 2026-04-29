<script lang="ts">
	import FormatGrid from '$lib/components/FormatGrid.svelte';
</script>

<svelte:head>
	<title>Convert Files Free & Private — No Uploads, No Tracking | ConvertwithMe</title>
	<meta name="description" content="Convert files instantly in your browser. No uploads to servers, no tracking, 100% free. Supports JPG, PNG, WebP, PDF, DOCX, HTML, and more." />
	<meta property="og:title" content="Convert Files Free & Private — No Uploads, No Tracking | ConvertwithMe" />
	<meta property="og:description" content="Convert files instantly in your browser. No uploads to servers, no tracking, 100% free. Supports JPG, PNG, WebP, PDF, DOCX, HTML, and more." />
	<meta name="twitter:title" content="Convert Files Free & Private — No Uploads, No Tracking | ConvertwithMe" />
	<meta name="twitter:description" content="Convert files instantly in your browser. No uploads to servers, no tracking, 100% free." />
	<script type="application/ld+json">{JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebApplication",
		"name": "ConvertwithMe",
		"url": "https://Convertwith.me",
		"description": "Privacy-first, client-side file converter. Convert images, documents, and PDFs instantly in your browser with no server uploads.",
		"applicationCategory": "UtilitiesApplication",
		"operatingSystem": "Any",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		},
		"browserRequirements": "Requires JavaScript. Requires SharedArrayBuffer support for WASM-based conversions (Chrome, Edge, Firefox with HTTPS)."
	})}</script>
	<script type="application/ld+json">{JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "ConvertwithMe",
		"url": "https://Convertwith.me",
		"logo": "https://Convertwith.me/og-image.png",
		"description": "Privacy-first, client-side file converter. Convert images, documents, and PDFs instantly in your browser with no server uploads.",
		"sameAs": [
			"https://twitter.com/ConvertwithMe",
			"https://github.com/ConvertwithMe"
		]
	})}</script>
	<script type="application/ld+json">{JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "ConvertwithMe",
		"url": "https://Convertwith.me",
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": "https://Convertwith.me/convert/{search_term_string}"
			},
			"query-input": "required name=search_term_string"
		}
	})}</script>
	<script type="application/ld+json">{JSON.stringify({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [{
			"@type": "ListItem",
			"position": 1,
			"name": "Home",
			"item": "https://Convertwith.me"
		}]
	})}</script>
</svelte:head>

<section class="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
	<div class="max-w-5xl mx-auto px-4 py-20 sm:py-28 text-center">
		<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
			Convert Files Free & Private
			<span class="block text-brand-200 text-2xl sm:text-3xl lg:text-4xl mt-3">No Uploads, No Tracking</span>
		</h1>
		<p class="text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto mb-8">
			All conversions run in your browser using WebAssembly. Your files never leave your device. No server uploads, no data collection, no limits.
		</p>
		<a href="#formats" class="btn-primary bg-white text-brand-700 hover:bg-gray-100 inline-flex items-center gap-2 text-lg px-8 py-4">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
			Browse All Converters
		</a>
	</div>
</section>

<section class="max-w-7xl mx-auto px-4 py-16">
	<div class="text-center mb-12">
		<h2 id="formats" class="text-3xl font-bold text-gray-900 mb-3">All Converters</h2>
		<p class="text-gray-600 max-w-xl mx-auto">Choose a conversion type. Every converter is free, private, and runs entirely in your browser.</p>
	</div>
	<FormatGrid />
</section>

<section class="bg-white py-16">
	<div class="max-w-5xl mx-auto px-4">
		<h2 class="text-3xl font-bold text-gray-900 text-center mb-12">Why We're Different</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="text-center">
				<div class="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
					<svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">100% Private</h3>
				<p class="text-gray-600">Traditional converters upload your files to their servers. We process everything locally in your browser using WebAssembly. No one sees your files but you.</p>
			</div>
			<div class="text-center">
				<div class="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
					<svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">Blazing Fast</h3>
				<p class="text-gray-600">No upload/download wait times. Your files convert instantly using your device's processing power. Large files process faster than uploading to a server.</p>
			</div>
			<div class="text-center">
				<div class="w-14 h-14 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
					<svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">No Limits</h3>
				<p class="text-gray-600">No daily conversion limits, no file size caps, no watermarks, no sign-up required. Convert as many files as you want, whenever you want.</p>
			</div>
		</div>
	</div>
</section>

<section class="bg-gray-50 py-16">
	<div class="max-w-5xl mx-auto px-4 text-center">
		<h2 class="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div>
				<div class="w-12 h-12 mx-auto bg-brand-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4" aria-hidden="true">1</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Upload</h3>
				<p class="text-gray-600">Drag and drop or browse for your file. It stays on your device.</p>
			</div>
			<div>
				<div class="w-12 h-12 mx-auto bg-brand-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4" aria-hidden="true">2</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Convert</h3>
				<p class="text-gray-600">WebAssembly converts your file locally. No data leaves your browser.</p>
			</div>
			<div>
				<div class="w-12 h-12 mx-auto bg-brand-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4" aria-hidden="true">3</div>
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Download</h3>
				<p class="text-gray-600">Get your converted file instantly. No email, no account, no wait.</p>
			</div>
		</div>
	</div>
</section>
