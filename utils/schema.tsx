import { pgTable, serial, text, varchar, uuid, timestamp } from "drizzle-orm/pg-core";

// Users table for Supabase auth
export const Users = pgTable('users', {
    id: uuid('id').primaryKey(),
    email: varchar('email').notNull().unique(),
    full_name: varchar('full_name'),
    avatar_url: varchar('avatar_url'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
})

// AI Output table
export const AIOutput = pgTable('aiOutput',{
    id:serial('id').primaryKey(),
    FormData:varchar('FormData').notNull(),
    aiResponse:text('aiResponse'),
    templateSlug:varchar('templateSlug').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
})