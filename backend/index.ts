import express from 'express'
import swaggerUi from 'swagger-ui-express'
import router from './routes'
import * as swaggerDocument from './swagger.json'


const port = 8081 || process.env.PORT

var app = express()


app.use('/api', router)

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})