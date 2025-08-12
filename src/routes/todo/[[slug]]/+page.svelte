<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageProps } from './$types';
    
    // Use the new $props() rune instead of export let
    let { data, form }: PageProps = $props();
    
    // Use $state() for reactive state instead of let
    let taskInput = $state('');
  </script>
  
  <h1 class="text-center text-2xl font-bold p-2">Hello and welcome to my todo-sv!</h1>
  
  {#if form?.success}
    <div class="text-green-600 text-center p-2">
      Task "{form.todo?.task}" added successfully!
      {data.todos[0].id}
      {data.todos[0].task}
      {data.todos[0].completed}
    </div>
  {:else if form?.error}
    <div class="text-red-600 text-center p-2">
      Error: {form.error}
    </div>
  {/if}
  
  <div class="flex justify-center">
    <form method="post" use:enhance={() => {
      return async ({ result, update }) => {
        if (result.type === 'success') {
          taskInput = ''; // Clear input on successful submission
        }
        update();
      };
    }}>
      <input 
        class="border border-gray-300 rounded p-2" 
        type="text" 
        name="task" 
        id="task"
        bind:value={taskInput}
        placeholder="Enter your task..."
        required
      />
      <button 
        class="bg-blue-500 rounded text-white p-2 m-2 cursor-pointer hover:bg-blue-600" 
        type="submit"
      >
        Add Task
      </button>
    </form>
  </div>