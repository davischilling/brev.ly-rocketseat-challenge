import { ValidationError } from '@/application/errors'
import type { IValidation } from '@/domain/contracts'
import type { z } from 'zod'

export class ZodValidator<T> implements IValidation<T> {
  constructor(private readonly schema: z.ZodType<T>) {}

  parse(input: unknown): T {
    const result = this.schema.safeParse(input)
    if (!result.success) {
      throw new ValidationError(`Validation failed: ${result.error.message}`)
    }
    return result.data
  }
}
