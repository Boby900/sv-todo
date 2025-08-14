// src/lib/auth-client.ts
import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL // Points to your own app
});

export const { signIn, signUp, useSession } = createAuthClient();
