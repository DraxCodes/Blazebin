<script>
	import { pasteBody } from '../lib/pasteStore';
	import { fade } from 'svelte/transition';

	export let value = '';
	export let minRows = 1;
	export let maxRows;

	let codeEditor;

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;

	const handleTextChange = () => {
		pasteBody.set(value);
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === 9) {
			const { selectionStart: start, selectionEnd: end } = codeEditor;
			e.preventDefault();
			value = value.slice(0, start) + '\t' + value.slice(end);
			codeEditor.setSelectionRange(start + 2, start + 1);
		}
	};
</script>

<p class="font-extralight pl-2">Please note: Default language is Markdown</p>
<div
	in:fade={{ duration: 1000 }}
	out:fade={{ duration: 1 }}
	class="container rounded-lg border-4 border-dashed border-gray-200"
>
	<pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight}">{value +
			'\n'}</pre>

	<textarea
		bind:this={codeEditor}
		on:keydown={handleKeyDown}
		class="border-transparent focus:border-transparent focus:ring-0 rounded-lg overflow-auto"
		on:change={handleTextChange}
		bind:value
		bind
		placeholder="Paste here..."
	/>
</div>

<style>
	.container {
		position: relative;
	}

	pre,
	textarea {
		font-family: inherit;
		padding: 0.5em;
		box-sizing: border-box;
		border-style: none;
		line-height: 1.2;
		overflow: hidden;
	}

	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
	}
</style>
