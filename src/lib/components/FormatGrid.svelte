<script lang="ts">
	import { getAllSlugs } from '$lib/utils/converterRouter';

	const slugs = getAllSlugs();

	const formatIcons: Record<string, string> = {
		jpg: '🖼️',
		png: '🖼️',
		webp: '🖼️',
		gif: '🖼️',
		heic: '📷',
		pdf: '📄',
		docx: '📝',
		html: '🌐'
	};

	const categoryColors: Record<string, string> = {
		imagemagick: 'from-blue-500 to-purple-500',
		pandoc: 'from-orange-500 to-red-500',
		mammoth: 'from-green-500 to-teal-500',
		pdfjs: 'from-yellow-500 to-orange-500',
		pdflib: 'from-pink-500 to-rose-500'
	};

	const slugToCategory: Record<string, string> = {
		'jpg-to-png': 'imagemagick',
		'jpg-to-webp': 'imagemagick',
		'jpg-to-gif': 'imagemagick',
		'png-to-jpg': 'imagemagick',
		'png-to-webp': 'imagemagick',
		'webp-to-jpg': 'imagemagick',
		'webp-to-png': 'imagemagick',
		'gif-to-png': 'imagemagick',
		'gif-to-jpg': 'imagemagick',
		'heic-to-jpg': 'imagemagick',
		'heic-to-png': 'imagemagick',
		'pdf-to-docx': 'pandoc',
		'docx-to-pdf': 'pandoc',
		'docx-to-html': 'mammoth',
		'pdf-to-jpg': 'pdfjs',
		'pdf-to-png': 'pdfjs',
		'jpg-to-pdf': 'pdflib',
		'png-to-pdf': 'pdflib'
	};

	function parseSlug(slug: string): { from: string; to: string } {
		const parts = slug.split('-to-');
		return { from: parts[0], to: parts[1] };
	}

	interface CardRef {
		el: HTMLElement;
		visible: boolean;
	}

	let observedCards = $state<Set<number>>(new Set());

	let cardElements: HTMLElement[] = [];

	function setupObserver(node: HTMLElement) {
		const gridContainer = node.firstElementChild as HTMLElement;
		if (!gridContainer) return { destroy() {} };

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const index = Array.from(gridContainer.children).indexOf(entry.target as HTMLElement);
						if (index !== -1) {
							const newSet = new Set(observedCards);
							newSet.add(index);
							observedCards = newSet;
						}
					}
				}
			},
			{ rootMargin: '100px' }
		);

		for (const child of Array.from(gridContainer.children)) {
			observer.observe(child);
		}

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<div id="formats" class="w-full" use:setupObserver>
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
		{#each slugs as slug, i}
			{@const { from, to } = parseSlug(slug)}
			{@const category = slugToCategory[slug] || 'imagemagick'}
			{@const gradient = categoryColors[category]}
			{@const isVisible = observedCards.has(i)}
			<a
				href="/convert/{slug}"
				data-sveltekit-prefetch
				class="card group p-4 text-center transition-all duration-200 {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}"
				style="transition: opacity 0.4s ease, transform 0.4s ease;"
			>
				<div class="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br {gradient} flex items-center justify-center text-white text-lg font-bold">
					{formatIcons[from] || '📁'}
				</div>
				<p class="text-sm font-semibold text-gray-800 group-hover:text-brand-600 transition-colors">
					{from.toUpperCase()} → {to.toUpperCase()}
				</p>
				<p class="text-xs text-gray-400 mt-1">Free & Private</p>
			</a>
		{/each}
	</div>
</div>
