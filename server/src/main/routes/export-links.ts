import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { swaggerDocs } from '../docs/swagger'
import { linksServiceFactory } from '../factories/links.factory'

export const exportLinksRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/links/export',
    swaggerDocs.EXPORT_LINKS,
    async (request, reply) => {
      const service = linksServiceFactory()
      const { csvUrl } = await service.exportLinks({
        searchQuery: request.query.searchQuery,
      })
      return reply.status(201).send({
        csvUrl,
      })
    }
  )
}
