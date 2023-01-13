import express from 'express'
import cors from 'cors'
// @ts-ignore
// import { compression } from 'compression'
import helmet from 'helmet'
import mongoDbInit from './db/mongo'
import userRoute from '../modules/user/infrastructure/route/user.route'
import authRoute from '../modules/auth/infrastructure/route/auth.route'
import protectedRoute from '../modules/protected/infrastructure/route/protected.route'
import { sequelizeDbInit } from './db/mysql'
// Add Passport module
import '../modules/auth/infrastructure/passport'
import clientRoute from '../modules/client/infrastructure/route/client.route'

const app = express()

app.disable('x-powered-by')

// @ts-ignore
const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: true
}

app.use(express.json())
app.use(cors())

app.use(helmet()) // HTTP Headers Security
// app.use(compression()) // Compress all routes

// User routes
app.use(userRoute)

// Client routes
app.use(clientRoute)

// Login routes
app.use(authRoute)

// PROTECTED TEST ROUTES
app.use(protectedRoute)

// MongoDB Init
mongoDbInit().then()
// mysql Init
sequelizeDbInit().then()

// Test route to /
app.get('/', (_req, res) => {
  res.send({ message: 'Taxator API started' })
})

export { app }
