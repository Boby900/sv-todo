<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { onMount } from 'svelte';
	import { sessionStore } from '$lib/stores/session';
	import { goto } from '$app/navigation';
	
	let session: Record<string, any> | null = null;
	let isLoading = true;

	sessionStore.subscribe((value) => {
		session = value;
	});

	async function loadSession() {
		isLoading = true;
		try {
			session = await authClient.getSession();
			sessionStore.set(session);
		} catch (err) {
			console.error('Error getting session:', err);
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		loadSession(); // ✅ runs once at start
	});

	const navigation = [
		{ name: 'Home', href: '/', current: true },
		{ name: 'About', href: '#', current: false },
		{ name: 'Login', href: '/signin', current: false }
	];

	async function handleSignOut() {
		try {
			await authClient.signOut();
			sessionStore.set(null);
			goto('/', { invalidateAll: true });
		} catch (err) {
			console.error('Error signing out:', err);
		}
	}
</script>

<nav class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-lg">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex flex-shrink-0 items-center">
				<div class="flex items-center space-x-2">
					<a href="/" class="flex items-center space-x-2">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"
					>
						<span class="text-sm font-bold text-white">B</span>
						</div>
						<span class="text-xl font-bold text-gray-900">todo-sv</span>
					</a>
				</div>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-1">
					{#each navigation as item}
						{#if item.name !== 'Login'}
							<div class="relative">
								<a
									href={item.href}
									class="rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 {item.current
										? 'border border-blue-200 bg-blue-50 text-blue-700'
										: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
								>
									{item.name}
								</a>
							</div>
						{/if}
					{/each}
					<!-- Conditional rendering for Login/SignOut -->
					{#if isLoading}
						<!-- Show loading state -->
						<div class="animate-pulse rounded-md bg-gray-200 px-3 py-2 text-sm">Loading...</div>
					{:else if session?.data}
						<!-- User is logged in - show SignOut -->
						<div class="relative">
							<button
								onclick={handleSignOut}
								class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
							>
								Sign Out
							</button>
						</div>
					{:else}
						<!-- User is NOT logged in - show Login -->
						<div class="relative">
							<a
								onclick={() => setTimeout(loadSession, 500)}
								href="/signin"
								class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
							>
								Login
							</a>
						</div>
					{/if}
				</div>
			</div>

			<!-- CTA Button -->
			<div class="hidden md:block">
				<button
					class="transform rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl"
				>
					<a href="/todo/hello">Get Started</a>
				</button>
			</div>
		</div>
	</div>
</nav>
