<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import StickyFooterAd from '$lib/components/StickyFooterAd.svelte';

	import { page } from '$app/stores';

	const SITE_URL = 'https://Convertwith.me';

	let { children } = $props();

	let canonicalUrl = $derived(SITE_URL + $page.url.pathname);
</script>

<svelte:head>
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="ConvertwithMe" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content="https://Convertwith.me/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="ConvertwithMe — Convert Files Free & Private" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@ConvertwithMe" />
	<meta name="twitter:image" content="https://Convertwith.me/og-image.png" />
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
	<StickyFooterAd />
</div>
