import { asc, desc } from 'drizzle-orm'
import { z } from 'zod'

export enum SortDirection {
  Desc = 'desc',
  Asc = 'asc',
}

export enum SortBy {
  CreatedAt = 'createdAt',
}

export const searchableParams = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(['createdAt']).optional(),
  sortDirection: z.enum(['desc', 'asc']).optional(),
  page: z.coerce.number().optional().default(1),
  perPage: z.coerce.number().optional().default(20),
})
export type SearchableParams = z.input<typeof searchableParams>

export const orderFieldsBy = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  fields: any,
  sortBy?: SortBy,
  sortDirection?: SortDirection
) => {
  if (sortBy) {
    return sortDirection === 'asc' ? asc(fields[sortBy]) : desc(fields[sortBy])
  }
  return desc(fields.id)
}
