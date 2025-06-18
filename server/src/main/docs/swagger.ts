import { searchableParams } from '@/infra/db/utils'
import { z } from 'zod'

const validationErrorResponse = z.object({
  message: z.string().describe('Bad request'),
  errors: z
    .array(
      z.object({
        message: z.string().describe('Validation error message'),
        code: z.string().describe('Validation error code'),
        expected: z.string().optional().describe('Expected value'),
        received: z.string().optional().describe('Received value'),
        path: z
          .array(z.string())
          .describe('Path to the error in the request body'),
      })
    )
    .describe('Validation errors'),
})

const linkResponse = z
  .object({
    id: z.string().describe('The ID of the created link'),
    originalUrl: z
      .string()
      .url()
      .describe('The original URL that was shortened'),
    shortenedUrl: z.string().describe('The shortened URL created'),
    accessCount: z
      .number()
      .int()
      .describe('Number of times the link has been accessed'),
    createdAt: z.date().describe('Creation date of the link'),
    updatedAt: z.date().describe('Last update date of the link'),
  })
  .describe('Link created successfully')

const RESERVED_WORDS = ['admin', 'login', 'signup', 'api']

export const swaggerDocs = {
  CREATE_LINKS: {
    schema: {
      summary: 'Create a link',
      tags: ['links'],
      body: z.object({
        originalUrl: z
          .string()
          .url({ message: 'Must be a valid URL.' })
          .refine(val => !RESERVED_WORDS.includes(val.toLowerCase()), {
            message: 'This alias is reserved.',
          })
          .describe('Custom original URL (optional)'),
        shortenedUrl: z
          .string()
          .min(2, { message: 'Alias must be at least 2 characters.' })
          .max(32, { message: 'Alias must be at most 32 characters.' })
          .regex(/^[a-zA-Z0-9_.\-\/]+$/, {
            message:
              'Only letters, numbers, hyphen, underscore, dot, and slash are allowed.',
          })
          .refine(val => !val.includes(' '), {
            message: 'Spaces are not allowed.',
          })
          .refine(val => !RESERVED_WORDS.includes(val.toLowerCase()), {
            message: 'This alias is reserved.',
          })
          .describe('Custom shortened URL (optional)'),
      }),
      response: {
        201: linkResponse,
        400: validationErrorResponse,
        409: z.object({
          message: z.string().describe('Link already exists'),
        }),
        500: z.object({
          message: z.string().describe('Internal server error'),
        }),
      },
    },
  },
  DELETE_LINKS: {
    schema: {
      summary: 'Delete links',
      tags: ['links'],
      querystring: z.object({
        shortenedUrl: z.string().describe('The ID of the link to delete'),
      }),
      response: {
        204: {
          description: 'Link deleted successfully',
          type: 'null',
        },
        404: z.object({
          message: z.string().describe('Link not found'),
        }),
      },
    },
  },
  GET_ALL_LINKS: {
    schema: {
      summary: 'Get all links',
      tags: ['links'],
      querystring: searchableParams,
      response: {
        200: z.object({
          total: z.number().int().describe('Total number of links'),
          links: z.array(linkResponse).describe('List of links'),
        }),
        400: z.object({
          message: z.string().describe('Bad request'),
        }),
        500: z.object({
          message: z.string().describe('Internal server error'),
        }),
      },
    },
  },
  GET_ORIGINAL_URL: {
    schema: {
      summary: 'Get original URL from shortened link',
      tags: ['links'],
      querystring: z.object({
        shortenedUrl: z
          .string()
          .describe('The shortened URL to retrieve the original URL for'),
      }),
      response: {
        200: linkResponse,
        404: z.object({
          message: z.string().describe('Link not found'),
        }),
      },
    },
  },
  INCREASE_ACCESS: {
    schema: {
      summary: 'Increase link access count',
      tags: ['links'],
      querystring: z.object({
        shortenedUrl: z
          .string()
          .describe('The shortened URL to retrieve the original URL for'),
      }),
      response: {
        200: linkResponse,
        404: z.object({
          message: z.string().describe('Link not found'),
        }),
      },
    },
  },
}
