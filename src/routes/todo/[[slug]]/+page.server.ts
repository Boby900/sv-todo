import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { todos } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
// LOAD FUNCTION - runs before page loads, data goes to 'data' prop
export const load: PageServerLoad = async () => {
	try {
		// Get all existing todos from database
		const allTodos = await db.select().from(todos);

		return {
			todos: allTodos
		};
	} catch (error) {
		console.error('Failed to load todos:', error);
		return {
			todos: []
		};
	}
};
export const actions = {
	createTodo: async ({ request }) => {
		console.log('Hello from server!');

		try {
			// Get form data from the request
			const formData = await request.formData();
			const taskText = formData.get('task') as string;

			// Validate that we have a task
			if (!taskText || taskText.trim() === '') {
				console.log('No task provided');
				return {
					success: false,
					error: 'Task cannot be empty'
				};
			}

			// Insert the actual task from the form
			const todo = await db
				.insert(todos)
				.values({
					task: taskText.trim(),
					completed: false
				})
				.returning();

			console.log('Created todo:', todo);

			return {
				success: true,
				todo: todo[0]
			};
		} catch (error) {
			console.error('Database query error:', error);
			return {
				success: false,
				error: 'Failed to create todo'
			};
		}
	},
	markCompleted: async ({ request }) => {
		const formData = await request.formData();
		console.log('Form data:', formData);
		const id = formData.get('id') as string;
		console.log('Todo ID to mark completed:', id);
		try {
			// First, get the current todo to determine its current state
			const currentTodo = await db
				.select()
				.from(todos)
				.where(eq(todos.id, Number(id)));
			console.log('Current todo:', currentTodo);
			if (currentTodo.length === 0) {
				return {
					success: false,
					error: 'Todo not found'
				};
			}

			// Toggle the completed status
			const newCompletedStatus = !currentTodo[0].completed;

			await db
				.update(todos)
				.set({
					completed: newCompletedStatus
				})
				.where(eq(todos.id, Number(id)));

			return {
				success: true
			};
		} catch (error) {
			console.error('Database query error:', error);
			return {
				success: false,
				error: 'Failed to toggle todo completion'
			};
		}
	},
	deleteTodo: async ({ request }) => {
		console.log('Hello from server!');
		const formData = await request.formData();
		const id = formData.get('id') as string;
		try {
			await db.delete(todos).where(eq(todos.id, Number(id)));
			return {
				success: true
			};
		} catch (error) {
			console.error('Database query error:', error);
			return {
				success: false,
				error: 'Failed to delete todo'
			};
		}
	}
} satisfies Actions;
