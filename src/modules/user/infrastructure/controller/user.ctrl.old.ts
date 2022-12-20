import { Request, Response } from 'express'
import { UserUseCase } from '../../application/userUseCase'

export class UserController {
  constructor(private userUseCase: UserUseCase) {
    this.insertCtrl = this.insertCtrl.bind(this)
    this.listAllCtrl = this.listAllCtrl.bind(this)
    this.getDetailUserCtrl = this.getDetailUserCtrl.bind(this)
  }

  public async insertCtrl({ body }: Request, res: Response) {
    try {
      const user = await this.userUseCase.registerUser(body)
      res.send({ user })
    } catch (e) {
      console.error(`[CONTROLLER ERROR] ${e}`)
    }
  }
  public async listAllCtrl({}: Request, res: Response) {
    try {
      const users = await this.userUseCase.getAllUsers()
      res.send({ users })
    } catch (e) {
      console.error(`[CONTROLLER ERROR] ${e}`)
    }
  }

  public async getDetailUserCtrl({ query }: Request, res: Response) {
    try {
      const { id } = query
      const user = await this.userUseCase.getDetailUser(id)
      res.send({ user })
    } catch (e) {
      console.error(`[CONTROLLER ERROR] ${e}`)
    }
  }
}
