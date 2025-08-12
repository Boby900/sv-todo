import { pgTable, serial, integer, text, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	age: integer('age')
});

export const todos = pgTable('todos', {
	id: serial('id').primaryKey(),
	task: text('task').notNull(),
	completed: boolean('completed').notNull().default(false)
});

