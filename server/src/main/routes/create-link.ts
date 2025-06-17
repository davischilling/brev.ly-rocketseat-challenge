import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { swaggerDocs } from '../docs/swagger'
import { linksServiceFactory } from '../factories/links.factory'

export const createLinksRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/links',
    swaggerDocs.CREATE_LINKS,
    async (request, reply) => {
      try {
        console.log('Creating link with data:', request.body);

        const service = linksServiceFactory()
        const result = await service.create(request.body)
        console.log(result);

        return reply.status(200).send(result)
      } catch (error) {
        console.error('Error creating link:', error)
        return reply.status(500).send({ message: 'Internal Server Error' })
      }
    }
  )
}
