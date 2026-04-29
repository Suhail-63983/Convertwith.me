<script lang="ts">
	import { page } from '$app/stores';
	import { getConverter } from '$lib/utils/converterRouter';
	import type { ConverterModule } from '$lib/utils/converterRouter';
	import { checkSharedArrayBufferSupport } from '$lib/utils/fileUtils';
	import DropZone from '$lib/components/DropZone.svelte';
	import ConversionProgress from '$lib/components/ConversionProgress.svelte';
	import ConversionResult from '$lib/components/ConversionResult.svelte';
	import AdBanner from '$lib/components/AdBanner.svelte';
	import FormatGrid from '$lib/components/FormatGrid.svelte';

	let { data } = $props();

	let stage: 'idle' | 'loading-wasm' | 'converting' | 'done' | 'error' = $state('idle');
	let errorMessage = $state('');
	let selectedFile: File | null = $state(null);
	let resultBlob: Blob | null = $state(null);
	let resultFilename = $state('');
	let converterModule: ConverterModule | null = $state(null);
	let wasmFromCache = $state(false);
	let sabSupported = $state(true);

	const slug = $derived(data.slug);
	const fromFormat = $derived(data.fromFormat);
	const toFormat = $derived(data.toFormat);
	const libraryName = $derived(data.libraryName);
	const meta = $derived(data.meta);
	const canonicalUrl = $derived($page.url.origin + $page.url.pathname);

	const faqJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: meta.faq.map((f: { question: string; answer: string }) => ({
			'@type': 'Question',
			name: f.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: f.answer
			}
		}))
	});

	const softwareAppJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		'name': `ConvertwithMe — ${fromFormat.toUpperCase()} to ${toFormat.toUpperCase()} Converter`,
		'url': canonicalUrl,
		'applicationCategory': 'UtilitiesApplication',
		'operatingSystem': 'Any',
		'description': meta.description,
		'offers': {
			'@type': 'Offer',
			'price': '0',
			'priceCurrency': 'USD'
		}
	});

	const breadcrumbJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'itemListElement': [
			{
				'@type': 'ListItem',
				'position': 1,
				'name': 'Home',
				'item': 'https://Convertwith.me'
			},
			{
				'@type': 'ListItem',
				'position': 2,
				'name': 'Converters',
				'item': 'https://Convertwith.me/#formats'
			},
			{
				'@type': 'ListItem',
				'position': 3,
				'name': `${fromFormat.toUpperCase()} to ${toFormat.toUpperCase()}`,
				'item': canonicalUrl
			}
		]
	});

	const needsWasm = $derived(libraryName === 'imagemagick' || libraryName === 'pdfjs');

	async function loadConverter() {
		const converter = getConverter(slug);
		if (!converter) {
			errorMessage = 'Conversion type not found';
			stage = 'error';
			return;
		}

		if (needsWasm && !checkSharedArrayBufferSupport()) {
			sabSupported = false;
			stage = 'error';
			errorMessage = 'Please use Chrome, Edge, or Firefox with HTTPS to use this converter. Your browser does not support SharedArrayBuffer which is required for WebAssembly processing.';
			return;
		}

		stage = 'loading-wasm';

		try {
			const cache = await caches.open('wasm-cache-v1');
			const cacheKey = `wasm-${libraryName}`;
			const cached = await cache.match(cacheKey);
			if (cached) {
				wasmFromCache = true;
			}

			converterModule = await converter.load();
			await converterModule.init();

			await cache.put(cacheKey, new Response('loaded'));
			wasmFromCache = true;

			stage = 'idle';
		} catch (e: any) {
			console.error('WASM load error:', e);
			errorMessage = 'Converter failed to load. Please refresh the page and try again.';
			stage = 'error';
		}
	}

	function handleFileSelected(file: File) {
		selectedFile = file;
		startConversion(file);
	}

	async function startConversion(file: File) {
		if (!converterModule) {
			await loadConverter();
			if (!converterModule) return;
		}

		stage = 'converting';

		try {
			const result = await converterModule.convert(file, fromFormat, toFormat);
			resultBlob = result.blob;
			resultFilename = result.filename;
			stage = 'done';
		} catch (e: any) {
			console.error('Conversion error:', e);
			errorMessage = e?.message || 'Conversion failed. Please try again with a different file.';
			stage = 'error';
		}
	}

	function handleReset() {
		stage = 'idle';
		selectedFile = null;
		resultBlob = null;
		resultFilename = '';
		errorMessage = '';
	}

	$effect(() => {
		// Re-run when the route changes
		const currentSlug = slug;
		converterModule = null;
		handleReset();
		loadConverter();
	});
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
	<script type="application/ld+json">{JSON.stringify(softwareAppJsonLd)}</script>
	<script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
</svelte:head>

<section class="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white py-16">
	<div class="max-w-4xl mx-auto px-4 text-center">
		<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{meta.h1}</h1>
		<p class="text-brand-100 text-lg max-w-2xl mx-auto">{meta.description}</p>
	</div>
</section>

<section class="max-w-4xl mx-auto px-4 -mt-8">
	<div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
		{#if !sabSupported && needsWasm}
			<div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
				<svg class="w-12 h-12 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
				</svg>
				<h3 class="text-lg font-semibold text-red-800 mb-2">Browser Not Supported</h3>
				<p class="text-red-700">Please use Chrome, Edge, or Firefox with HTTPS to use this converter. Your browser does not support SharedArrayBuffer which is required for WebAssembly processing.</p>
			</div>
		{:else if stage === 'idle' && !selectedFile}
			<DropZone {fromFormat} onfileSelected={handleFileSelected} />
		{:else if stage === 'loading-wasm'}
			<ConversionProgress {stage} {errorMessage} fromCache={wasmFromCache} />
		{:else if stage === 'converting'}
			{#if selectedFile}
				<div class="bg-gray-50 rounded-lg p-4 mb-4 flex items-center gap-3">
					<div class="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center">
						<svg class="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
					</div>
					<span class="text-sm text-gray-700">{selectedFile.name}</span>
				</div>
			{/if}
			<ConversionProgress {stage} {errorMessage} fromCache={wasmFromCache} />
		{:else if stage === 'done' && resultBlob}
			<ConversionResult blob={resultBlob} filename={resultFilename} {toFormat} />
			<div class="mt-4 text-center">
				<button onclick={handleReset} class="btn-secondary text-sm">
					Convert Another File
				</button>
			</div>
		{:else if stage === 'error'}
			<ConversionProgress {stage} {errorMessage} />
			<div class="mt-4 text-center">
				<button onclick={handleReset} class="btn-secondary text-sm">
					Try Again
				</button>
			</div>
		{/if}
	</div>
</section>

{#if stage === 'done'}
	<AdBanner slotId="banner-728x90" />
{/if}

<section class="max-w-4xl mx-auto px-4 py-16">
	<h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<div class="card p-6 text-center">
			<div class="w-10 h-10 mx-auto bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold mb-3" aria-hidden="true">1</div>
			<h3 class="font-semibold text-gray-900 mb-2">Upload</h3>
			<p class="text-sm text-gray-600">Drag and drop or browse for your {fromFormat.toUpperCase()} file. It stays on your device.</p>
		</div>
		<div class="card p-6 text-center">
			<div class="w-10 h-10 mx-auto bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold mb-3" aria-hidden="true">2</div>
			<h3 class="font-semibold text-gray-900 mb-2">Convert</h3>
			<p class="text-sm text-gray-600">Your file is converted locally in your browser. No data ever leaves your device.</p>
		</div>
		<div class="card p-6 text-center">
			<div class="w-10 h-10 mx-auto bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold mb-3" aria-hidden="true">3</div>
			<h3 class="font-semibold text-gray-900 mb-2">Download</h3>
			<p class="text-sm text-gray-600">Download your {toFormat.toUpperCase()} file instantly. No email or account needed.</p>
		</div>
	</div>
</section>

<section class="bg-white py-16">
	<div class="max-w-4xl mx-auto px-4">
		<h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Why Use This {fromFormat.toUpperCase()} to {toFormat.toUpperCase()} Converter</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="flex gap-4">
				<div class="w-10 h-10 flex-shrink-0 bg-green-100 rounded-lg flex items-center justify-center">
					<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
					</svg>
				</div>
				<div>
					<h3 class="font-semibold text-gray-900">100% Private</h3>
					<p class="text-sm text-gray-600">Your files never leave your device. No server uploads, no data collection.</p>
				</div>
			</div>
			<div class="flex gap-4">
				<div class="w-10 h-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
					<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
				<div>
					<h3 class="font-semibold text-gray-900">Lightning Fast</h3>
					<p class="text-sm text-gray-600">No upload/download wait. Conversion happens instantly on your device.</p>
				</div>
			</div>
			<div class="flex gap-4">
				<div class="w-10 h-10 flex-shrink-0 bg-purple-100 rounded-lg flex items-center justify-center">
					<svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
				</div>
				<div>
					<h3 class="font-semibold text-gray-900">No Limits</h3>
					<p class="text-sm text-gray-600">No daily caps, no file size limits, no watermarks, no sign-up required.</p>
				</div>
			</div>
			<div class="flex gap-4">
				<div class="w-10 h-10 flex-shrink-0 bg-yellow-100 rounded-lg flex items-center justify-center">
					<svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
					</svg>
				</div>
				<div>
					<h3 class="font-semibold text-gray-900">Secure</h3>
					<p class="text-sm text-gray-600">Runs over HTTPS with browser-grade security. No third-party servers involved.</p>
				</div>
			</div>
		</div>
	</div>
</section>

{#if meta.faq && meta.faq.length > 0}
	<section class="max-w-4xl mx-auto px-4 py-16">
		<h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
		<div class="space-y-4">
			{#each meta.faq as item}
				<details class="card group">
					<summary class="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 hover:text-brand-600 transition-colors">
						<span>{item.question}</span>
						<svg class="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</summary>
					<div class="px-4 pb-4 text-sm text-gray-600">
						{item.answer}
					</div>
				</details>
			{/each}
		</div>
	</section>
{/if}

<section class="max-w-7xl mx-auto px-4 py-16">
	<h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">More Converters</h2>
	<FormatGrid />
</section>
