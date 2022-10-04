<script>
	import github from 'svelte-highlight/styles/github';
	import hljs from 'highlight.js';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	let hljsResult;
	let originalResult;
	let language;
	let pending = true;
	let isCopied = false;

	const loadPaste = async () => {
		const pasteResponse = await fetch(`/api/db/get?url_slug=${$page.params.id}`);
		if (pasteResponse.ok) {
			const pasteResult = await pasteResponse.json();
			originalResult = pasteResult.body;
			language = pasteResult.language;
			hljsResult = hljs.highlight(pasteResult.body, { language: pasteResult.language }).value;
			pending = false;
		} else {
			pending = false;
		}
	};

	const handleCopy = () => {
		if (!isCopied) {
			navigator.clipboard.writeText(originalResult);
			isCopied = true;
			setTimeout(() => {
				isCopied = false;
			}, 3000);
		}
	};

	const handleHover = () => {
		console.log('yay');
	};
</script>

<svelte:head>
	{@html github}
</svelte:head>
<div on:mousedown={handleCopy} class="pb-4 max-w-7xl mx-auto">
	<div class="relative rounded-lg bg-white shadow m-10">
		<div class="overflow-auto px-4 py-5 sm:p-6 scrollbar-hide">
			<div class="absolute top-0 right-0 grid grid-flow-col">
				{#if !isCopied}
					<p
						in:fade={{ duration: 1500 }}
						out:fade={{ duration: 1 }}
						on:click={handleCopy}
						class="px-2 py-2 shadow-lg"
					>
						Click To Copy
					</p>
				{:else}
					<p in:fade={{ duration: 1500 }} out:fade={{ duration: 1 }} class="px-2 py-2 shadow-lg">
						Text Copied
					</p>
				{/if}
				<span class="px-2 py-2 shadow-lg">{language ? language : ''}</span>
			</div>
			{#if hljsResult}
				<pre in:fade={{ duration: 1500 }} out:fade={{ duration: 1 }}>{@html hljsResult}</pre>
			{:else if pending && !hljsResult}
				<p use:loadPaste>Loading....</p>
			{:else if !pending && !hljsResult}
				<p>Paste not found...</p>
			{/if}
		</div>
	</div>
</div>
