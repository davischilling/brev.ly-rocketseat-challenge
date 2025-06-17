import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  id: text('id')
    .primaryKey(),
  original_url: text('original_url')
    .notNull(),
  shortened_url: text('shortened_url')
    .notNull()
    .unique(),
  access_count: text('access_count')
    .notNull()
    .default('0'),
  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
})
