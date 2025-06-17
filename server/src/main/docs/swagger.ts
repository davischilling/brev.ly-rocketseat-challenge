import { searchableParams } from '@/infra/utils'
import { z } from 'zod'

export const swaggerDocs = {
  CREATE_LINKS: {
    schema: {
      summary: 'Create a link',
      tags: ['links'],
      body: z.object({
        originalUrl: z.string().url().describe('The URL to create a link for'),
        shortenedUrl: z
          .string()
          .url()
          .describe('Custom shortened URL (optional)'),
      }),
      response: {
        201: z
          .object({
            id: z.string().describe('The ID of the created link'),
            originalUrl: z
              .string()
              .url()
              .describe('The original URL that was shortened'),
            shortenedUrl: z
              .string()
              .url()
              .describe('The shortened URL created'),
            accessCount: z
              .number()
              .int()
              .describe('Number of times the link has been accessed'),
            createdAt: z.date().describe('Creation date of the link'),
            updatedAt: z.date().describe('Last update date of the link'),
          })
          .describe('Link created successfully'),
        400: z.object({
          message: z.string().describe('Bad request'),
        }),
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
      params: z.object({
        shortenedUrl: z.string().describe('The ID of the link to delete'),
      }),
      response: {
        204: z.object({}).describe('Link deleted successfully'),
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
          links: z.array(
            z.object({
              id: z.string().describe('The ID of the link'),
              originalUrl: z.string().url().describe('The original URL that was shortened'),
              shortenedUrl: z.string().url().describe('The shortened URL created'),
              accessCount: z.number().int().describe('Number of times the link has been accessed'),
              createdAt: z.date().describe('Creation date of the link'),
              updatedAt: z.date().describe('Last update date of the link'),
            })
          ).describe('List of links'),
        }),
        400: z.object({
          message: z.string().describe('Bad request'),
        }),
      },
    },
  },
  GET_ORIGINAL_URL: {
    schema: {
      summary: 'Get original URL from shortened link',
      tags: ['links'],
      params: z.object({
        shortenedUrl: z.string().describe('The shortened URL to retrieve the original URL for'),
      }),
      response: {
        200: z.object({
          originalUrl: z.string().url().describe('The original URL that was shortened'),
        }).describe('Original URL retrieved successfully'),
        404: z.object({
          message: z.string().describe('Link not found'),
        }),
      },
    },
  },
}
