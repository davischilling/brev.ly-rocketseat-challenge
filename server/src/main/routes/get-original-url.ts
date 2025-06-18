import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { swaggerDocs } from '../docs/swagger'
import { linksServiceFactory } from '../factories/links.factory'
import { NotFoundError } from '@/application/errors/notFoundError'

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/links/original',
    swaggerDocs.GET_ORIGINAL_URL,
    async (request, reply) => {
      try {
        const { shortenedUrl } = request.query
        const service = linksServiceFactory()
        const link = await service.findOriginalUrlByShortenedUrl(shortenedUrl)
        return reply.status(200).send({
          ...link,
        })
      } catch (error) {
        if (error instanceof NotFoundError) {
          return reply.status(404).send({ message: error.message })
        }
        return reply.status(500).send({ message: 'Internal Server Error' })
      }
    }
  )
}
