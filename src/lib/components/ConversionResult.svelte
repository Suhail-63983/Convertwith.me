<script lang="ts">
	import { formatFileSize } from '$lib/utils/fileUtils';

	interface Props {
		blob: Blob;
		filename: string;
		toFormat: string;
	}

	let { blob, filename, toFormat }: Props = $props();

	let fileUrl = $derived(URL.createObjectURL(blob));
	let fileSize = $derived(formatFileSize(blob.size));

	function handleDownload() {
		const a = document.createElement('a');
		a.href = fileUrl;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
</script>

<div class="bg-white rounded-xl border border-gray-200 p-6 max-w-md mx-auto">
	<div class="text-center mb-4">
		<div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
			<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		</div>
		<h3 class="text-lg font-semibold text-gray-900">Conversion Complete</h3>
	</div>

	<div class="bg-gray-50 rounded-lg p-4 mb-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800 uppercase">
					{toFormat}
				</span>
				<span class="text-sm text-gray-600">{filename}</span>
			</div>
			<span class="text-sm text-gray-500">{fileSize}</span>
		</div>
	</div>

	<button
		onclick={handleDownload}
		class="btn-primary w-full flex items-center justify-center gap-2"
	>
		<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
		</svg>
		Download {filename}
	</button>
</div>
