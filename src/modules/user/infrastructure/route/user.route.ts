import { Router } from 'express'
import { UserUseCase } from '../../application/userUseCase'
import { UserController } from '../controller/user.ctrl'
import { MockRepository } from '../repository/mock.repository'
import { MongoRepository } from '../repository/mongo.repository'

const route = Router()
/**
 * Start Repository, here we can switch between ORMs with repositories
 */
// const userRepo = new MongoRepository()
const userRepo = new MockRepository()

/**
 * Use cases
 */

const userUseCase = new UserUseCase(userRepo)

/**
 * User controllers
 */

const userCtrl = new UserController(userUseCase)

/**
 *
 */

route.post(`/user`, userCtrl.insertCtrl)
route.get(`/user`, userCtrl.getCtrl)

export default route
