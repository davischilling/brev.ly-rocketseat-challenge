import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinksRoute, deleteLinksRoute, getAllLinksRoute, getOriginalUrlRoute, increaseLinkAccessCountRoute } from './routes'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply
      .status(400)
      .send({ message: 'Invalid request', errors: error.validation })
  }
  return reply.status(500).send({ message: 'Internal server error' })
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyMultipart)

// Health check route
app.get('/health', async (request, reply) => {
  return { status: 'ok' }
})

// Register routes
app.register(createLinksRoute)
app.register(deleteLinksRoute)
app.register(getAllLinksRoute)
app.register(getOriginalUrlRoute)
app.register(increaseLinkAccessCountRoute)

export { app };