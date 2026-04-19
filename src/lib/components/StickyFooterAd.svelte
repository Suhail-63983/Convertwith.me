<script lang="ts">
	let visible = $state(true);

	function close() {
		visible = false;
	}
</script>

<!-- MONETAG STICKY FOOTER AD: Replace the inner div content with your Monetag sticky footer script.
     Example: <script data-zone="YOUR_STICKY_ZONE_ID" src="https://example.com/sticky.js"></script>
     This ad has a close button so users can dismiss it.
     The sticky footer should only appear after page load, never blocking initial content.
     See DEPLOYMENT.md for detailed instructions on adding Monetag ad code. -->
{#if visible}
	<div class="sticky bottom-0 w-full z-50 bg-white border-t border-gray-300 shadow-lg">
		<div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
			<div class="monetag-sticky-footer flex-1 text-center text-sm text-gray-400" data-slot="sticky-footer">
				<!-- Monetag sticky footer ad loads here -->
				<p>Advertisement</p>
			</div>
			<button
				onclick={close}
				class="ml-4 p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
				aria-label="Close advertisement"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	</div>
{/if}
