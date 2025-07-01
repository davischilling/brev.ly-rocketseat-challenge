import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import {
  createLinksRoute,
  deleteLinksRoute,
  getAllLinksRoute,
  getOriginalUrlRoute,
  increaseLinkAccessCountRoute,
  exportLinksRoute,
} from './routes'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler((error, _request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    const errors = error.validation.map(error => ({
      ...error.params.issue,
    }))
    return reply.status(400).send({
      message: error.message,
      errors,
    })
  }
  console.log('Error:', error);
  return reply.status(500).send({ message: 'Internal server error' })
})

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
})

app.register(fastifyMultipart)

app.get('/health', async (_request, _reply) => {
  return { status: 'ok' }
})

// Register routes
app.register(createLinksRoute)
app.register(deleteLinksRoute)
app.register(getAllLinksRoute)
app.register(getOriginalUrlRoute)
app.register(increaseLinkAccessCountRoute)
app.register(exportLinksRoute)

export { app }
