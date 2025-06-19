import { asc, desc } from 'drizzle-orm'

export enum SortDirection {
  Desc = 'desc',
  Asc = 'asc',
}

export enum SortBy {
  CreatedAt = 'createdAt',
}

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
