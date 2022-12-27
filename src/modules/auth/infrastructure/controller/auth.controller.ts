import { Request, Response } from 'express'
import { AuthUseCase } from '../../application/authUseCase'

export class AuthController {
  // CRUD
  constructor(private authUseCase: AuthUseCase) {
    this.login = this.login.bind(this)
    this.getUser = this.getUser.bind(this)
    this.checkToken = this.checkToken.bind(this)
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
      const user = await this.authUseCase.getUser(body.token)
      return res.json({ user: user })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }
  async checkToken({ body }: Request, res: Response) {
    try {
      if (!body.token) return res.json({ isValid: false })
      const isValid = await this.authUseCase.getUser(body.token)
      if (!isValid) return res.json({ isValid: false })
      return res.json({ isValid: true })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }
}
