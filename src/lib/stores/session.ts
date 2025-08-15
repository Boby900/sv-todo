import { writable } from 'svelte/store';

export const sessionStore = writable<Record<string, any> | null>(null);