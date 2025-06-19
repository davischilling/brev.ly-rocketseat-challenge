import { db } from '@/infra/postgresDb'
import { count, ilike } from 'drizzle-orm'

export type TableTotalCount = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  countBy: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  column: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  comapareWith: any
  searchQuery?: string
}

export const tableTotalCount = ({
  countBy,
  column,
  comapareWith,
  searchQuery,
}: TableTotalCount) => {
  return db
    .select({ total: count(countBy) })
    .from(column)
    .where(searchQuery ? ilike(comapareWith, `%${searchQuery}%`) : undefined)
}
