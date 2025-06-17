import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { swaggerDocs } from '../docs/swagger'

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async app => {
  app.get('/links/:shortened_url/original', swaggerDocs.GET_ORIGINAL_URL, async (request, reply) => {
    const { shortenedUrl } = request.params
    return reply.status(200).send({
      originalUrl: `https://example.com/${shortenedUrl}`
    })
  })
}
