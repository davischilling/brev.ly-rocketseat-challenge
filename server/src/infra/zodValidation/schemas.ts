import { z } from "zod";
import { Readable } from 'node:stream'

export const uploadFileToStorageInput = z.object({
    folder: z.enum(['images', 'downloads']),
    fileName: z.string(),
    contentType: z.string(),
    contentStream: z.instanceof(Readable),
})

export const searchableParams = z.object({
    searchQuery: z.string().optional(),
    sortBy: z.enum(['createdAt']).optional(),
    sortDirection: z.enum(['desc', 'asc']).optional(),
    page: z.coerce.number().optional().default(1),
    perPage: z.coerce.number().optional().default(20),
})
export type SearchableParams = z.input<typeof searchableParams>