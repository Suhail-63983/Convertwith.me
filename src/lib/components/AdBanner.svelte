<script lang="ts">
	interface Props {
		slotId?: string;
	}
	let { slotId = 'banner-728x90' }: Props = $props();
</script>

<!-- MONETAG BANNER AD: Replace the div below with your Monetag banner script tag.
     Example: <script data-zone="YOUR_ZONE_ID" src="https://example.com/banner.js"></script>
     Place this component AFTER the conversion result, never before the converter.
     See DEPLOYMENT.md for detailed instructions on adding Monetag ad code. -->
<div class="monetag-banner w-full max-w-[728px] mx-auto my-6 bg-gray-100 border border-gray-200 rounded-lg p-4 text-center text-sm text-gray-400" data-slot={slotId}>
	<!-- Monetag ad loads here -->
	<p>Advertisement</p>
</div>
