import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { swaggerDocs } from '../docs/swagger'

export const getAllLinksRoute: FastifyPluginAsyncZod = async app => {
    app.get('/links', swaggerDocs.GET_ALL_LINKS, async (request, reply) => {
        return reply.status(200).send({
            total: 0,
            links: [
                {
                    id: '1',
                    originalUrl: 'https://example.com',
                    shortenedUrl: `https://short.ly/${Math.random().toString(36).substring(2, 8)}`,
                    accessCount: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
        })
    })
}
