import { Router } from 'express'

import { MySqlRepository } from '../../../user/infrastructure/repository/mysql.repository'
import { AuthController } from '../controller/auth.controller'
import { AuthUseCase } from '../../application/authUseCase'
import { authenticate } from '../middleware/authChecks'

const authRoute = Router()

const userRepo = new MySqlRepository()

/**
 * Use cases
 */
// const userUseCase = new UserUseCase(userRepo)
const authUseCase = new AuthUseCase(userRepo)

/**
 * User controllers
 */
const authController = new AuthController(authUseCase)

authRoute.post('/auth/login', authController.login)
authRoute.post('/auth/check-token', authController.checkToken)
authRoute.post('/auth/refresh-token', authController.refreshToken)
authRoute.post('/auth/get-user', authenticate, authController.getUser)

export default authRoute
