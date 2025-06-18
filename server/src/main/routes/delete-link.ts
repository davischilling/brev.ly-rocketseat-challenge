import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { swaggerDocs } from '../docs/swagger'
import { linksServiceFactory } from '../factories/links.factory'
import { NotFoundError } from '@/application/errors/notFoundError'

export const deleteLinksRoute: FastifyPluginAsyncZod = async app => {
  app.delete('/links', swaggerDocs.DELETE_LINKS, async (request, reply) => {
    try {
      const { shortenedUrl } = request.query
      const service = linksServiceFactory()
      await service.remove(shortenedUrl)
      return reply.status(204).send()
    } catch (error) {
      if (error instanceof NotFoundError) {
        return reply.status(404).send({ message: error.message })
      }
      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  })
}
