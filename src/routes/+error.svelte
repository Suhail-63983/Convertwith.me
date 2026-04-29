<script lang="ts">
	import { page } from '$app/stores';

	const status = $derived($page.status);
	const message = $derived($page.error?.message || 'An unexpected error occurred');
</script>

<svelte:head>
	<title>{status} — ConvertwithMe</title>
</svelte:head>

<div class="max-w-2xl mx-auto px-4 py-24 text-center">
	<div class="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
		<svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
		</svg>
	</div>
	<h1 class="text-4xl font-bold text-gray-900 mb-4">{status}</h1>
	<p class="text-lg text-gray-600 mb-8">{message}</p>

	{#if status === 404}
		<p class="text-gray-500 mb-6">The conversion type you're looking for doesn't exist. Check out our available converters below.</p>
	{/if}

	<a href="/" class="btn-primary inline-block" data-sveltekit-prefetch>
		Go to Homepage
	</a>
</div>
