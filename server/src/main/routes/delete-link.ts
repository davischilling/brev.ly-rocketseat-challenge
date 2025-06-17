import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { swaggerDocs } from '../docs/swagger'

export const deleteLinksRoute: FastifyPluginAsyncZod = async app => {
  app.delete('/links/:shortened_url', swaggerDocs.DELETE_LINKS, async (request, reply) => {
    const { shortenedUrl } = request.params;
    return reply.status(204).send()
  })
}
