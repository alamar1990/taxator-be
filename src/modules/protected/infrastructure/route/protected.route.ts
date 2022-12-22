import { Router } from 'express'
import passport from 'passport'

const protectedRoute = Router()

protectedRoute.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`This is a protected route \n You have a total of: 2400$`)
})

export default protectedRoute
