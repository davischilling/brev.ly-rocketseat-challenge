import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

export type Env = z.infer<typeof envSchema>
export const env = envSchema.parse(process.env)
