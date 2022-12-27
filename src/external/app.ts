import express from 'express'
import cors from 'cors'
import mongoDbInit from '../modules/user/infrastructure/db/mongo'
import userRoute from '../modules/user/infrastructure/route/user.route'
import authRoute from '../modules/auth/infrastructure/route/auth.route'
import protectedRoute from '../modules/protected/infrastructure/route/protected.route'
import { sequelizeDbInit } from '../modules/user/infrastructure/db/mysql'

// Add Passport module
import '../modules/auth/infrastructure/passport'

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
app.use(cors())

// User routes
app.use(userRoute)

// Login routes
app.use(authRoute)

// TEST ROUTES
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
