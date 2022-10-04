<script>
	import { pasteBody } from '../lib/pasteStore';

	export let value = '';
	export let minRows = 1;
	export let maxRows;

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;

	const handleTextChange = () => {
		pasteBody.set(value);
	};

</script>
	<div class="container rounded-lg border-4 border-dashed border-gray-200">
		<pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight}">{value +
				'\n'}</pre>

		<textarea on:change={handleTextChange} bind:value placeholder="Paste here..." />
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
