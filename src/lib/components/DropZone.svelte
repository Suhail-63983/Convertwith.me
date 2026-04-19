<script lang="ts">
	import { getAcceptAttribute, isValidFileType, formatFileSize } from '$lib/utils/fileUtils';

	interface Props {
		fromFormat: string;
		onfileSelected?: (file: File) => void;
	}

	let { fromFormat, onfileSelected }: Props = $props();

	let file: File | null = $state(null);
	let dragOver = $state(false);
	let error = $state('');
	let acceptAttr = $derived(getAcceptAttribute(fromFormat));

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		error = '';

		if (!e.dataTransfer?.files.length) return;

		const dropped = e.dataTransfer.files[0];
		validateAndSet(dropped);
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		dragOver = true;
	}

	function handleDragLeave() {
		dragOver = false;
	}

	function handleFileInput(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files?.length) return;

		error = '';
		validateAndSet(target.files[0]);
	}

	function validateAndSet(f: File) {
		if (!isValidFileType(f, fromFormat)) {
			error = `Invalid file type. Expected: ${fromFormat.toUpperCase()}. Got: ${f.name.split('.').pop()?.toUpperCase() || 'unknown'}`;
			file = null;
			return;
		}

		if (f.size > 500 * 1024 * 1024) {
			error = 'File is larger than 500MB. Conversion may be slow on your device.';
		}

		file = f;
		error = '';
		onfileSelected?.(f);
	}

	function clearFile() {
		file = null;
		error = '';
	}
</script>

<div class="w-full">
	{#if file}
		<div class="bg-white rounded-xl border border-gray-200 p-6">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<div class="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center">
						<svg class="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
					</div>
					<div>
						<p class="font-medium text-gray-900">{file.name}</p>
						<p class="text-sm text-gray-500">{formatFileSize(file.size)}</p>
					</div>
				</div>
				<button
					onclick={clearFile}
					class="text-gray-400 hover:text-red-500 transition-colors p-2"
					aria-label="Remove file"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	{:else}
		<div
			class="relative border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer {dragOver ? 'border-brand-500 bg-brand-50' : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50'}"
			ondragover={handleDragOver}
			ondragleave={handleDragLeave}
			ondrop={handleDrop}
			role="button"
			tabindex="0"
			onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { const input = document.getElementById('dropzone-input'); input?.click(); } }}
		>
			<svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
			</svg>
			<p class="text-lg font-medium text-gray-700 mb-1">
				Drag & drop your {fromFormat.toUpperCase()} file here
			</p>
			<p class="text-sm text-gray-500 mb-4">or click to browse</p>
			<input
				id="dropzone-input"
				type="file"
				accept={acceptAttr}
				onchange={handleFileInput}
				class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
			/>
		</div>
	{/if}

	{#if error}
		<div class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
			{error}
		</div>
	{/if}
</div>
