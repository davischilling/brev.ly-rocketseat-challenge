import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { swaggerDocs } from '../docs/swagger'
import { linksServiceFactory } from '../factories/links.factory'
import { LinkAlreadyExistsError } from '@/application/errors'

export const createLinksRoute: FastifyPluginAsyncZod = async app => {
  app.post('/links', swaggerDocs.CREATE_LINKS, async (request, reply) => {
    try {
      const service = linksServiceFactory()
      const link = await service.create(request.body)
      return reply.status(201).send({
        ...link,
      })
    } catch (error) {
      if (error instanceof LinkAlreadyExistsError) {
        return reply.status(409).send({ message: error.message })
      }
      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  })
}
