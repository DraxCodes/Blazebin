<script>
	import { user } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import Auth from '../../components/Auth.svelte';
	import Profile from '../../components/Profile.svelte';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		if (session) {
			user.set(session.user);
		} else {
			user.set(null);
		}
	});
</script>

{#if $user}
	<Profile />
{:else}
	<Auth />
{/if}
