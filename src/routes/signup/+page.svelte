<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation'; // Change this import

	let name = '';
	let email = '';
	let password = '';
	let loading = false;
	let error = '';
	let success = '';

	async function handleSignup() {
		loading = true;
		error = '';
		success = '';
		await authClient.signUp.email(
			{
				email,
				password,
				name
			},
			{
				onError(context) {
					error = context.error.message;
					loading = false; // Add this
					console.error('Signup error:', context.error.message);
				},

				onSuccess(context) {
					success = context.data.message;
					loading = false; // Add this
					console.log('Signup successful:', context.data.message);
					goto('/'); // Use goto() instead of redirect()
				}
			}
		);
	}
</script>

<div class="mx-auto mt-8 max-w-md rounded-lg bg-white p-6 shadow-md">
	<h1 class="mb-6 text-2xl font-bold">Create Account</h1>

	{#if success}
		<div class="mb-4 rounded bg-green-100 p-3 text-green-700">{success}</div>
	{/if}

	{#if error}
		<div class="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
	{/if}

	<div class="space-y-4">
		<input
			type="text"
			placeholder="Full Name"
			bind:value={name}
			class="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500"
			required
		/>

		<input
			type="email"
			placeholder="Email"
			bind:value={email}
			class="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500"
			required
		/>

		<input
			type="password"
			placeholder="Password (min 8 characters)"
			bind:value={password}
			class="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500"
			minlength="8"
			required
		/>

		<button
			on:click={handleSignup}
			disabled={loading}
			class="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
		>
			{loading ? 'Creating Account...' : 'Sign Up'}
		</button>
	</div>

	<p class="mt-4 text-center text-sm">
		Already have an account?
		<a href="/signin" class="text-blue-600 hover:underline">Sign In</a>
	</p>
</div>
