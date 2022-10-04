<script>
	import { supabase } from '$lib/supabaseClient';
	import { user } from '$lib/sessionStore';
	import { invalidate } from '$app/navigation';

	let loading = true;
	let discord_name = null;
	let discord_id = null;
	let avatar_url = null;

	function getProfile(node) {
		try {
			loading = true;
			const user = supabase.auth.user();

			supabase
				.from('profiles')
				.select(`discord_id, avatar_url, discord_name`)
				.eq('id', user?.id)
				.single()
				.then(({ data, error, status }) => {
					if (data) {
						discord_name = data.discord_name;
						discord_id = data.discord_id;
						avatar_url = data.avatar_url;
					}
					if (error && status !== 406) throw error;
				});
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
			await invalidate('/account');
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div use:getProfile class="border-b border-gray-200">
			<div class="-ml-2 -mt-2 flex flex-wrap items-baseline justify-center">
				<h3 class="ml-2 mt-2 text-xl font-medium leading-6 text-gray-900">User Profile</h3>
				<hr />
			</div>
			<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md mt-4">
				<div class="md:flex">
					<div class="w-full p-2 py-10">
						<div class="flex justify-center">
							<div class="relative">
								<img alt="user avatar" src={avatar_url} class="rounded-full" width="80" />
								<span
									class="absolute border-white border-4 h-5 w-5 top-12 left-16 bg-green-700 rounded-full"
								/>
							</div>
						</div>

						<div class="flex flex-col text-center mt-3 mb-4">
							<span class="text-2xl font-medium">{discord_name}</span>
							<span class="text-md text-gray-400">{$user.email}</span>
							<span class="text-xs text-gray-400">{discord_id}</span>
						</div>

						<div class="px-14 mt-5">
							<button
								on:click={signOut}
								class="h-12 bg-gray-200 w-full text-black text-md rounded hover:shadow hover:bg-gray-300 mb-2"
								>Logout</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
