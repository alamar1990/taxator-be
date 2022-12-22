import passport from 'passport'
import { UserUseCase } from '../../../user/application/userUseCase'

const checkRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized')
  }
  const hasRole = roles.find((role) => req.user.role === role)
  if (!hasRole) {
    return res.status(403).send('You are not allowed to make this request.')
  }

  return next()
}

const authenticate = passport.authenticate('jwt', { session: false })

export { checkRole, authenticate }
