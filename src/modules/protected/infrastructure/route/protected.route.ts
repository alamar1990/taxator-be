import { Router } from 'express'
import { authenticate, checkRole } from '../../../auth/infrastructure/middleware/authChecks'
import { ROLES } from '../../../../resources/roles'

const protectedRoute = Router()

protectedRoute.get('/protected', authenticate, checkRole([ROLES.Admin, ROLES.Customer]), (req, res) => {
  res.send(`This is a protected route \n You have a total of: 2400$`)
})
export default protectedRoute
