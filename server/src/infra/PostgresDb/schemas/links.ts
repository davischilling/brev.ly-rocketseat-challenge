import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  id: text('id').primaryKey(),
  originalUrl: text('originalUrl').notNull(),
  shortenedUrl: text('shortenedUrl').notNull().unique(),
  accessCount: integer('accessCount').notNull().default(0),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
