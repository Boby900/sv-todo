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
        console.error("Failed to load todos:", error);
        return {
            todos: []
        };
    }
};
export const actions = {    
    createTodo: async ({ request }) => {
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
    },
    markCompleted: async ({ request }) => {
        console.log("Hello from server!")
        const formData = await request.formData();
        const id = formData.get('id') as string;
        try {
        await db.update(todos).set({
            completed: true
         }).where(eq(todos.id, Number(id)));   
         
         return {
            success: true,
         };
        } catch (error) {
            console.error("Database query error:", error);
            return {
                success: false,
                error: "Failed to mark todo as completed"
            };
        }
    }
} satisfies Actions;