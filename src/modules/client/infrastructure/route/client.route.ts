import { Router } from 'express'
import { MySqlRepository } from '../repository/mysql.repository'

import resource from '../../../../resources/baseRouteCRUDresource'
import { ClientUseCase } from '../../application/clientUseCase'
import { ClientController } from '../controller/client.controller'
import { authenticate } from '../../../auth/infrastructure/middleware/authChecks'
import multer from 'multer'
import path from 'path'
import { config } from '../../../../config'

const clientRoute = Router()
/**
 * Start Repository, here we can switch between ORMs with repositories
 */
const clientRepo = new MySqlRepository()

/**
 * Use cases
 */
const userUseCase = new ClientUseCase(clientRepo)

/**
 * User controllers
 */

const clientCtrl = new ClientController(userUseCase)

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     return cb(null, path.join(__dirname, '../../../../../', config.CLIENTS_UPLOADS_DIR))
//   },
//   filename: (req, file, cb) => {
//     const ext = file.originalname.split('.').reverse()[0]
//     const fileName = `${file.originalname}-${Date.now().toString()}.${ext}`
//     return cb(null, fileName)
//   }
// })
//
// const uploader = multer({ storage: storage })
/**
 *
 */
const prefix = 'client'
clientRoute.use(`/${prefix}`, resource(clientCtrl))
clientRoute.post(`/${prefix}/parse`, authenticate, clientCtrl.readFile)

export default clientRoute
