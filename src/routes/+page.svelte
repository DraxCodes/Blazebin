<script>
	import TextArea from '../components/TextArea.svelte';
	import { pasteLanguage, pasteBody } from '$lib/pasteStore';
	import { nanoid } from 'nanoid';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

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

			if (langResult.length > 0) {
				pasteLanguage.set(langResult[0].languageId);
			} else {
				pasteLanguage.set('md');
			}

			const id = nanoid(10);
			const { data, error } = await supabase.auth.getSession();
			let discord_id = '';
			if (data.session) {
				const {
					data: { user }
				} = await supabase.auth.getUser();
				discord_id = user.user_metadata.provider_id;
			}

			const dbAddResponse = await fetch('/api/db/add', {
				method: 'POST',
				body: JSON.stringify({
					language: $pasteLanguage,
					body: $pasteBody,
					date: Date.now(),
					url_slug: id,
					discord_id
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
	<div class="px-4 py-6 sm:px-0">
		<div class="flex items-start space-x-4">
			<div class="min-w-0 flex-1">
				<TextArea bind:value={val} minRows={30} maxRows={7000} />
			</div>
		</div>
		<div class="md:block">
			<div class="relative items-center mt-3">
				<div class="absolute right-0 grid grid-flow-col">
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
