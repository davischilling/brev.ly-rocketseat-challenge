import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'

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

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP server running on PORT: ${env.PORT}`)
})
