<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	// Use the new $props() rune instead of export let
	let { data, form }: PageProps = $props();

	// Use $state() for reactive state instead of let
	let taskInput = $state('');
</script>

<h1 class="p-2 text-center text-2xl font-bold">Hello and welcome to my todo-sv!</h1>
<p class="text-center text-2xl text-yellow-600">Your todos</p>

{#each data.todos as todo, index}
	{#if todo.completed}
		<div class="p-2 text-center line-through">
			<p>{todo.task}</p>
		</div>
	{:else}
		<div class="p-2 text-center">
			<form action="?/markCompleted" method="post">
				<input type="checkbox" name="id" value={todo.id} />
				<input type="hidden" name="id" value={todo.id} />
			</form>
			<p>{todo.task}</p>
		</div>
	{/if}
{/each}

{#if form?.success}
	<div class="p-2 text-center text-green-600">
		Task "{form.todo?.task}" added successfully!
		{data.todos[0].id}
		{data.todos[0].task}
		{data.todos[0].completed}
	</div>
{:else if form?.error}
	<div class="p-2 text-center text-red-600">
		Error: {form.error}
	</div>
{/if}

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
