'use strict'

import { BaseResourceController } from '../../../../resources/baseResourceController'
import { UserUseCase } from '../../application/userUseCase'
import { Request, Response } from 'express'

// const { devicesService } = require('./Devices.service')
export class UserController extends BaseResourceController {
  constructor(private userUseCase: UserUseCase) {
    super()
    this.all = this.all.bind(this)
    this.list = this.list.bind(this)
    this.view = this.view.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }
  async all({}: Request, res: Response) {
    try {
      const users = await this.userUseCase.all()
      return res.send({ result: users })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }

  async view({ params }: Request, res: Response) {
    try {
      const user = await this.userUseCase.view(params.id)
      return res.send({ result: user })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }

  async list({ body, query }: Request, res: Response) {
    try {
      // const users = await usersService.list(req.body)
      //
      // return res.send({
      //   result: users
      // })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }

  async create({ body, query }: Request, res: Response) {
    try {
      const user = await this.userUseCase.create(body)

      return res.send({
        result: user
      })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }

  async update({ body, params }: Request, res: Response) {
    try {
      const user = await this.userUseCase.update(params.id, body)

      return res.send({
        result: user
      })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }

  async remove({ params }: Request, res: Response) {
    try {
      const devices = await this.userUseCase.remove(params.id)
      return res.send({ result: devices })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }
}
