<script lang="ts">
	import { enhance } from '$app/forms';
	import { Trash, LoaderCircle } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';
	// Use the new $props() rune instead of export let
	let { data }: PageProps = $props();
	let isLoading = $state(false);
	let isDeleting = $state<string | number>('');
	let isMarking = $state<string | number>('');
	function handleToggle(e: Event) {
		e.preventDefault();
		const input = e.target as HTMLInputElement | null;
		if (input && input.form) {
			input.form.submit();
		}
	}
	// Use $state() for reactive state instead of let
	let taskInput = $state('');
</script>

<div>
	<h1 class="p-2 text-center text-3xl text-slate-500 font-bold">Hello and welcome to my todo-sv!</h1>
	<div class="flex justify-center mt-4">
		<form
			method="post"
			action="?/createTodo"
			use:enhance={() => {
				isLoading = true;
				return async ({ result, update }) => {
					isLoading = false;
					if (result.type === 'success') {
						taskInput = ''; // Clear input on successful submission
					}
					update();
					isLoading = false;
				};
			}}
		>
			<input
				class="rounded border border-gray-300 mb-1 p-2 w-full"
				type="text"
				name="task"
				id="task"
				bind:value={taskInput}
				placeholder="Enter your task..."
				required
			/>
			<button
				class="m-1 cursor-pointer rounded-md bg-blue-500 p-1 text-white hover:bg-blue-600 w-24 flex justify-center items-center"
				type="submit"
				disabled={isLoading}
			>
				{#if isLoading}
					<LoaderCircle class="animate-spin" />
				{:else}
					Add Task
				{/if}
			</button>
		</form>
	</div>
	<div class="mt-6 flex flex-col items-center gap-4 min-h-[200px]">
		{#each data.todos as todo (todo.id)}
			<div in:fade out:fade
				class="flex w-full max-w-md items-center justify-between rounded-lg bg-white p-4 shadow transition hover:scale-[1.02]"
			>
				<div class="flex items-center gap-4">
					<form
						action="?/markCompleted"
						method="post"
						class="flex items-center gap-2"
						use:enhance={() => {
							isMarking = todo.id;
							return async ({ update }) => {
								await update();
								isMarking = '';
							};
						}}
					>
						<input type="hidden" name="id" value={todo.id} />
						<input
							type="checkbox"
							name="completed"
							value="true"
							checked={todo.completed}
							onchange={handleToggle}
							class="h-5 w-5 cursor-pointer accent-blue-500"
							disabled={isMarking === todo.id}
						/>
					</form>
					<form
						action="?/deleteTodo"
						method="post"
						class="flex items-center"
						use:enhance={() => {
							isDeleting = todo.id;
							return async ({ update }) => {
								await update();
								isDeleting = '';
							};
						}}
					>
						<input type="hidden" name="id" value={todo.id} />
						<button type="submit" class="text-red-500 hover:text-red-700 w-8 h-8 flex justify-center items-center" disabled={isDeleting === todo.id}>
							{#if isDeleting === todo.id}
								<LoaderCircle class="animate-spin" />
							{:else}
								<Trash class="cursor-pointer" />
							{/if}
						</button>
					</form>
				</div>
				<p
					class="text-lg transition-all duration-200 {todo.completed
						? 'text-gray-400 line-through'
						: ''}"
				>
					{todo.task}
				</p>
			</div>
		{/each}
	</div>
</div>
