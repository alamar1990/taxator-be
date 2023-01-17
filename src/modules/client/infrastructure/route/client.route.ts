import { Router } from 'express'
import { SequelizeRepository } from '../repository/sequelize.repository'

import resource from '../../../../resources/baseRouteCRUDresource'
import { ClientUseCase } from '../../application/clientUseCase'
import { ClientController } from '../controller/client.controller'
import { authenticate } from '../../../auth/infrastructure/middleware/authChecks'

const clientRoute = Router()
/**
 * Start Repository, here we can switch between ORMs with repositories
 */
const clientRepo = new SequelizeRepository()

/**
 * Use cases
 */
const userUseCase = new ClientUseCase(clientRepo)

/**
 * User controllers
 */

const clientCtrl = new ClientController(userUseCase)

/**
 *
 */
const prefix = 'client'
clientRoute.use(`/${prefix}`, resource(clientCtrl))
clientRoute.post(`/${prefix}/parse`, authenticate, clientCtrl.readFile)

export default clientRoute
