import { env } from './env'
import { app } from './main/index'

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log(`HTTP server running on PORT: ${env.PORT}`)
})
