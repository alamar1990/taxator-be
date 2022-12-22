import { Router } from 'express'

import jwt from 'jsonwebtoken'
import UserSchemaSequelize from '../../../user/infrastructure/model/user.schema.sequelize'
import { compare } from 'bcrypt'
import { config } from '../../../../config'
import { MySqlRepository } from '../../../user/infrastructure/repository/mysql.repository'
import { UserUseCase } from '../../../user/application/userUseCase'
import { UserController } from '../../../user/infrastructure/controller/user.controller'
import { LoginController } from '../controller/login.controller'

const loginRoute = Router()

const userRepo = new MySqlRepository()

/**
 * Use cases
 */
const userUseCase = new UserUseCase(userRepo)

/**
 * User controllers
 */
const loginController = new LoginController(userUseCase)

loginRoute.post('/login', loginController.login)

export default loginRoute
