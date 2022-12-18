import express from 'express'
import cors from 'cors'
import dbInit from '../user/db/mongo'
import userRoute from '../user/infrastructure/route/user.route'

// import { apiRoutes } from './routes'

const app = express()

app.disable('x-powered-by')

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: true
}

app.use(express.json())
app.use(cors(options))

app.use(userRoute)
dbInit().then()

// Test route to /
app.get('/', (_req, res) => {
  res.send({message: 'Taxator API started'})
})

export {app}
