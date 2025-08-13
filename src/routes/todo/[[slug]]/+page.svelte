<script lang="ts">
	import { enhance } from '$app/forms';
	import { Trash } from '@lucide/svelte';
	import type { PageProps } from './$types';

	// Use the new $props() rune instead of export let
	let { data }: PageProps = $props();
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
	<h1 class="p-2 text-center text-2xl font-bold">Hello and welcome to my todo-sv!</h1>
	<p class="text-center text-2xl text-yellow-600">Your todos</p>
	<div class="flex justify-center">
		<form
			method="post"
			action="?/createTodo"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (result.type === 'success') {
						taskInput = ''; // Clear input on successful submission
					}
					update();
				};
			}}
		>
			<input
				class="rounded border border-gray-300 p-2"
				type="text"
				name="task"
				id="task"
				bind:value={taskInput}
				placeholder="Enter your task..."
				required
			/>
			<button
				class="m-2 cursor-pointer rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
				type="submit"
			>
				Add Task
			</button>
		</form>
	</div>
	<div class="mt-6 flex flex-col items-center gap-4">
		{#each data.todos as todo}
			<div
				class="flex w-full max-w-md items-center justify-between rounded-lg bg-white p-4 shadow transition hover:scale-[1.02]"
			>
				<div class="flex items-center gap-4">
					<form
						action="?/markCompleted"
						method="post"
						class="flex items-center gap-2"
						use:enhance={() => {
							return async ({ update }) => {
								update();
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
						/>
					</form>

					<form
						action="?/deleteTodo"
						method="post"
						class="flex items-center"
						use:enhance={() => {
							return async ({ update }) => {
								update();
							};
						}}
					>
						<input type="hidden" name="id" value={todo.id} />
						<button type="submit" class="text-red-500 hover:text-red-700">
							<Trash class="cursor-pointer" />
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
