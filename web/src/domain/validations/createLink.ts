import { z } from 'zod'

export type CreateLinkFormData = {
  originalUrl: string
  shortenedUrl: string
}

export const CreateLinkDefaultValues = {
  originalUrl: '',
  shortenedUrl: '',
}

const RESERVED_WORDS = ['admin', 'login', 'signup', 'api']

export const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .url({ message: 'URL inválida.' })
    .nonempty({ message: 'URL obrigatória.' })
    .refine(val => !RESERVED_WORDS.includes(val.toLowerCase()), {
      message: 'Alias reservado.',
    })
    .refine(val => !/\s/.test(val), {
      message: 'Sem espaços.',
    }),
  shortenedUrl: z
    .string()
    .nonempty({ message: 'URL obrigatória.' })
    .min(2, { message: 'Mínimo 2 caracteres.' })
    .max(32, { message: 'Máximo 32 caracteres.' })
    .regex(/^[a-zA-Z0-9_.\-\/]+$/, {
      message: 'Apenas letras, números, -, _, . e /.',
    })
    .refine(val => !val.includes(' '), {
      message: 'Sem espaços.',
    })
    .refine(val => !RESERVED_WORDS.includes(val.toLowerCase()), {
      message: 'Alias reservado.',
    })
    .describe('URL personalizada (opcional)'),
})
