<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="bg-gray-900 text-gray-300 mt-16">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div>
				<div class="flex items-center gap-2 mb-4">
					<svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<rect width="32" height="32" rx="8" fill="#2563EB" />
						<path d="M6 22V10L16 22V10" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M18 16H26M22 12V20" stroke="#93c5fd" stroke-width="2.5" stroke-linecap="round"/>
					</svg>
					<span class="text-lg font-bold text-white">Convert<span class="text-brand-400">withMe</span></span>
				</div>
				<p class="text-sm text-gray-400">
					All conversions happen in your browser. We never see your files.
				</p>
			</div>

			<div>
				<h3 class="text-white font-semibold mb-4">Quick Links</h3>
				<ul class="space-y-2 text-sm">
					<li><a href="/" class="hover:text-white transition-colors" data-sveltekit-prefetch>Home</a></li>
					<li><a href="/#formats" class="hover:text-white transition-colors">All Converters</a></li>
					<li><a href="/privacy" class="hover:text-white transition-colors" data-sveltekit-prefetch>Privacy Policy</a></li>
					<li><a href="/about" class="hover:text-white transition-colors">About</a></li>
				</ul>
			</div>

			<div>
				<h3 class="text-white font-semibold mb-4">Connect</h3>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
							Twitter / X
						</a>
					</li>
					<li>
						<a href="https://github.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
							GitHub
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
			<p>&copy; {year} ConvertwithMe. All rights reserved. All conversions are processed locally in your browser.</p>
		</div>
	</div>
</footer>
