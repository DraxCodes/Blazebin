<script>
	import { goto } from '$app/navigation';

	const handleClick = async () => {
		goto('/account');
	};

	const handleLoginClick = () => {};
</script>

<nav class="bg-gray-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<div class="flex-shrink-0 grid grid-flow-col text-xl">
					<img class="h-8 w-8" src="favicon.png" alt="Blazebin" />
					<p class="w-14 mt-1 ml-1 text-gray-200">Blazebin</p>
				</div>
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<a
							href="/"
							class="bg-gray-900 text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
							aria-current="page">Paste</a
						>
					</div>
				</div>
			</div>
			<div class="md:block">
				<div class="ml-4 flex items-center md:ml-6">
					<button
						on:click={handleClick}
						class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-gray-200 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>Account</button
					>
				</div>
			</div>
		</div>
	</div>
</nav>
