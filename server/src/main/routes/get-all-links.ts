import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { swaggerDocs } from '../docs/swagger'
import { linksServiceFactory } from '../factories/links.factory'

export const getAllLinksRoute: FastifyPluginAsyncZod = async app => {
  app.get('/links', swaggerDocs.GET_ALL_LINKS, async (request, reply) => {
    const service = linksServiceFactory()
    const links = await service.findAll()
    return reply.status(200).send({
      total: links.length,
      links,
    })
  })
}
