import { db } from '$lib/server/db';
import type { Actions } from './$types';
import { todos } from '$lib/server/db/schema';

export const actions = {
    default: async ({ request }) => {
        console.log("Hello from server!")
        
        try {
            // Get form data from the request
            const formData = await request.formData();
            const taskText = formData.get('task') as string;
            
            // Validate that we have a task
            if (!taskText || taskText.trim() === '') {
                console.log("No task provided");
                return {
                    success: false,
                    error: "Task cannot be empty"
                };
            }
            
            // Insert the actual task from the form
            const todo = await db.insert(todos).values({
                task: taskText.trim(),
                completed: false
            }).returning();
            
            console.log("Created todo:", todo);
            
            return {
                success: true,
                todo: todo[0]
            };
            
        } catch (error) {
            console.error("Database query error:", error);
            return {
                success: false,
                error: "Failed to create todo"
            };
        }
    }
} satisfies Actions;