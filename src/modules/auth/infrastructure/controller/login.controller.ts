import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { UserUseCase } from '../../../user/application/userUseCase'
import { Request, Response } from 'express'
import { config } from '../../../../config'

export class LoginController {
  // CRUD
  constructor(private userUseCase: UserUseCase) {
    this.login = this.login.bind(this)
  }

  async login({ body }: Request, res: Response) {
    try {
      const userWithEmail = await this.userUseCase.findByEmail(body.email)

      if (!userWithEmail) {
        return res.status(400).json({ message: 'Email or password does not match!' })
      }
      const match = await compare(body.password, userWithEmail.password)
      if (!match) {
        return res.status(400).json({ message: 'Email or password does not match!' })
      }
      const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, config.JWT_SECRET)

      res.json({ message: `You're logged in Welcome Back!`, token: jwtToken })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }
}
