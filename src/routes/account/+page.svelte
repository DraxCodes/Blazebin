<script>
	import Auth from '../../components/Auth.svelte';
	import Profile from '../../components/Profile.svelte';
	import { supabase } from '$lib/supabaseClient';

	let loggedIn = false;
	let loggedInUser;

	const requestUser = async () => {
		const { data, error } = await supabase.auth.getSession();
		console.log(data);
		if (!data.session) {
			loggedIn = false;
		} else {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			loggedIn = user ? true : false;
			loggedInUser = user;
		}
	};
</script>

<div use:requestUser />
{#if loggedIn}
	<Profile user={loggedInUser} />
{:else}
	<Auth />
{/if}
