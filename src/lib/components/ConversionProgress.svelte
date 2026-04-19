<script lang="ts">
	interface Props {
		stage: 'idle' | 'loading-wasm' | 'converting' | 'done' | 'error';
		errorMessage?: string;
		fromCache?: boolean;
	}

	let { stage, errorMessage = '', fromCache = false }: Props = $props();
</script>

{#if stage !== 'idle'}
	<div class="w-full max-w-md mx-auto py-6">
		{#if stage === 'loading-wasm'}
			<div class="text-center">
				<div class="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
					<div class="absolute inset-y-0 left-0 bg-brand-500 rounded-full animate-progress-bar" style="width: 60%"></div>
				</div>
				<p class="text-sm text-gray-600">
					{#if fromCache}
						Loading converter from cache...
					{:else}
						Initializing converter... <span class="text-gray-400">(first load may take a few seconds)</span>
					{/if}
				</p>
			</div>
		{:else if stage === 'converting'}
			<div class="text-center">
				<div class="inline-block w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-3"></div>
				<p class="text-sm text-gray-600">Converting your file...</p>
			</div>
		{:else if stage === 'done'}
			<div class="text-center">
				<div class="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-2">
					<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<p class="text-sm font-medium text-green-700">Done!</p>
			</div>
		{:else if stage === 'error'}
			<div class="text-center">
				<div class="inline-flex items-center justify-center w-10 h-10 bg-red-100 rounded-full mb-2">
					<svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
				<p class="text-sm font-medium text-red-700">{errorMessage || 'Conversion failed. Please try again.'}</p>
			</div>
		{/if}
	</div>
{/if}

<style>
	@keyframes progress-bar {
		0% { width: 0%; }
		50% { width: 70%; }
		80% { width: 85%; }
		100% { width: 95%; }
	}
	.animate-progress-bar {
		animation: progress-bar 3s ease-out forwards;
	}
</style>
