import { Request, Response } from 'express'
import { AuthUseCase } from '../../application/authUseCase'

export class LoginController {
  // CRUD
  constructor(private authUseCase: AuthUseCase) {
    this.login = this.login.bind(this)
    this.getUser = this.getUser.bind(this)
  }
  async login({ body }: Request, res: Response) {
    try {
      const { email, password } = body
      const jwtToken = await this.authUseCase.getJwtToken({ email, password })
      return res.json({ message: `You're logged in... Welcome Back!`, token: jwtToken })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }
  async getUser({ body }: Request, res: Response) {
    try {
      const user = await this.authUseCase.getUserByToken(body.token)
      return res.json({ user: user })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }
}
