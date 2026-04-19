<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import StickyFooterAd from '$lib/components/StickyFooterAd.svelte';

	import { page } from '$app/stores';

	let { children } = $props();

	let currentUrl = $derived($page.url.href);
</script>

<svelte:head>
	<link rel="canonical" href={currentUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="FileConvert" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:locale" content="en_US" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
	<StickyFooterAd />
</div>
