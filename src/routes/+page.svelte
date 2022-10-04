<script>
	import TextArea from '../components/TextArea.svelte';
	import { pasteLanguage, pasteBody } from '$lib/pasteStore';
	import { nanoid } from 'nanoid';
	import { goto } from '$app/navigation'

	const handleSubmit = async () => {

		const langresponse = await fetch('/api/findlanguage', {
			method: "POST",
			body: val,
			headers: {
        		'content-type': 'text/plain'
      		}
		});

		const langResult = await langresponse.json();
		console.log(langResult);

		pasteLanguage.set(langResult[0].languageId);
		const id = nanoid(10)

		const dbAddResponse = await fetch('/api/db/add', {
			method: "POST",
			body: JSON.stringify({language: $pasteLanguage, body: $pasteBody, date: Date.now(), url_slug: id}),
			headers: {
				'content-type': 'application/json'
			}
		});

		const dbAddResult = await dbAddResponse.json();
		console.log(dbAddResult)
		goto(`/pastes/${id}`);
	};

	let val = ``;
</script>

<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
	<!-- Replace with your content -->
	<div class="px-4 py-6 sm:px-0">
		<div class="flex items-start space-x-4">
			<div class="min-w-0 flex-1">
				<TextArea bind:value={val} minRows={30} maxRows={7000} />
			</div>
		</div>
		<div class="md:block">
			<div class="ml-4 flex items-center md:ml-6">
				<button
					on:click={handleSubmit}
					type="submit"
					class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>Post</button
				>
			</div>
		</div>
	</div>
</div>
