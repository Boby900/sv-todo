// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/svelte"

export const authClient = createAuthClient({
    baseURL: "http://localhost:5173", // Points to your own app
})

export const { signIn, signUp, useSession } = createAuthClient()