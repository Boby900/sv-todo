import { createAuthClient } from 'better-auth/svelte';
import { env } from '$env/dynamic/public';
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
	plugins: [
		emailOTPClient()
	],
	baseURL: env.PUBLIC_BETTER_AUTH_URL // Points to your own app
});
