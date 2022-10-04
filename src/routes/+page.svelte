<script>
	import TextArea from '../components/TextArea.svelte';
	import { pasteLanguage, pasteBody } from '$lib/pasteStore';
	import { nanoid } from 'nanoid';
	import { goto } from '$app/navigation';

	let processing = false;
	let val = ``;

	const handleSubmit = async () => {
		if (val) {
			processing = true;
			const langresponse = await fetch('/api/findlanguage', {
				method: 'POST',
				body: val,
				headers: {
					'content-type': 'text/plain'
				}
			});

			const langResult = await langresponse.json();
			console.log(langResult);

			pasteLanguage.set(langResult[0].languageId);
			const id = nanoid(10);

			const dbAddResponse = await fetch('/api/db/add', {
				method: 'POST',
				body: JSON.stringify({
					language: $pasteLanguage,
					body: $pasteBody,
					date: Date.now(),
					url_slug: id
				}),
				headers: {
					'content-type': 'application/json'
				}
			});

			const dbAddResult = await dbAddResponse.json();
			console.log(dbAddResult);
			goto(`/pastes/${id}`);
		}
	};
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
			<div class="relative items-center mt-3">
				<div class="absolute right-0 grid grid-flow-col">
					<div class="mr-3">
						<input
							class="block w-full px-10 py-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Discord ID (optional)"
						/>
					</div>
					<button
						on:click={handleSubmit}
						disabled={processing}
						type="submit"
						class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-10 py-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>Post</button
					>
				</div>
			</div>
		</div>
	</div>
</div>
