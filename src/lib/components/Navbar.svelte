<script lang="ts">
	let mobileMenuOpen = $state(false);

	function toggleMobile() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobile() {
		mobileMenuOpen = false;
	}
</script>

<nav class="bg-white border-b border-gray-200 sticky top-0 z-40">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16 items-center">
			<a href="/" class="flex items-center gap-2" data-sveltekit-prefetch>
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<rect width="32" height="32" rx="8" fill="#2563EB" />
					<path d="M8 16L14 10L20 16L14 22Z" fill="white" />
					<path d="M14 16L20 10L26 16L20 22Z" fill="#93c5fd" />
				</svg>
				<span class="text-xl font-bold text-gray-900">File<span class="text-brand-600">Convert</span></span>
			</a>

			<div class="hidden md:flex items-center gap-6">
				<a href="/" class="text-gray-600 hover:text-brand-600 font-medium transition-colors" data-sveltekit-prefetch>Home</a>
				<a href="/#formats" class="text-gray-600 hover:text-brand-600 font-medium transition-colors">All Converters</a>
			</div>

			<button
				class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
				onclick={toggleMobile}
				aria-label="Toggle menu"
				aria-expanded={mobileMenuOpen}
			>
				{#if mobileMenuOpen}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div class="md:hidden border-t border-gray-200 bg-white">
			<div class="px-4 py-3 space-y-2">
				<a href="/" class="block py-2 text-gray-600 hover:text-brand-600 font-medium" onclick={closeMobile} data-sveltekit-prefetch>Home</a>
				<a href="/#formats" class="block py-2 text-gray-600 hover:text-brand-600 font-medium" onclick={closeMobile}>All Converters</a>
			</div>
		</div>
	{/if}
</nav>
