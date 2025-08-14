<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { goto } from "$app/navigation";

  let email = '';
  let password = '';
  let rememberMe = true;
  let loading = false;
  let error = '';

  async function handleSignin() {
    loading = true;
    error = '';

    await authClient.signIn.email({
        email,
        password,
        rememberMe,
      },
     {
        onError(context) {
          error = context.error.message;
          loading = false; // Stop loading on error
          console.error('Signin error:', context.error.message);
          loading = false; // Stop loading on error
        },  
        onSuccess() {
          goto('/'); // redirect to protected page
          loading = false; // Stop loading on success
        },
     }
    );

  }
</script>

<div class="mx-auto mt-8 max-w-md rounded-lg bg-white p-6 shadow-md">
	<h1 class="mb-6 text-2xl font-bold">Sign In</h1>

	{#if error}
		<div class="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
	{/if}

	<div class="space-y-4">
		<input
			type="email"
			placeholder="Email"
			bind:value={email}
			class="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500"
			required
		/>

		<input
			type="password"
			placeholder="Password"
			bind:value={password}
			class="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500"
			required
		/>

		<label class="flex items-center">
			<input type="checkbox" bind:checked={rememberMe} class="mr-2" />
			Remember me
		</label>

		<button
			on:click={handleSignin}
			disabled={loading}
			class="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
		>
			{loading ? 'Signing In...' : 'Sign In'}
		</button>
	</div>

	<div class="mt-4 space-y-2 text-center text-sm">
		<a href="/forgot-password" class="block text-blue-600 hover:underline"> Forgot Password? </a>
		<span>Don't have an account? </span>
		<a href="/signup" class="text-blue-600 hover:underline">Sign Up</a>
	</div>
</div>
