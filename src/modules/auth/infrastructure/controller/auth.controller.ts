import { Request, Response } from 'express'
import { AuthUseCase } from '../../application/authUseCase'

export class AuthController {
  // CRUD
  constructor(private authUseCase: AuthUseCase) {
    this.login = this.login.bind(this)
    this.getUser = this.getUser.bind(this)
    this.checkToken = this.checkToken.bind(this)
    this.refreshToken = this.refreshToken.bind(this)
  }
  async login({ body }: Request, res: Response) {
    try {
      const { email, password } = body
      const jwtTokens = await this.authUseCase.getJwtToken({ email, password })
      return res.json({ message: `You're logged in... Welcome Back!`, tokens: jwtTokens })
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
      if (!body.token) return res.status(200).json({ isValid: false })
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
  async refreshToken({ body }: Request, res: Response) {
    try {
      if (!body.refreshToken) return res.status(401).json({ isValid: false })
      const jwtNewAccessToken = await this.authUseCase.refreshToken(body.refreshToken)
      if (!jwtNewAccessToken) return res.status(401).json({ message: '[ERROR] No access token was refreshed' })
      return res.json({ access_token: jwtNewAccessToken })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }
}
