import { BaseResourceController } from '../../../../resources/baseResourceController'
import { Request, Response } from 'express'
import { ClientUseCase } from '../../application/clientUseCase'

export class ClientController extends BaseResourceController {
  // CRUD
  constructor(private clientUseCase: ClientUseCase) {
    super()
    this.all = this.all.bind(this)
    this.list = this.list.bind(this)
    this.view = this.view.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this.readFile = this.readFile.bind(this)
  }
  async all({}: Request, res: Response) {
    try {
      const clients = await this.clientUseCase.all()
      return res.send({ result: clients })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }

  async view({ params }: Request, res: Response) {
    try {
      const client = await this.clientUseCase.view(params.id)
      return res.send({ result: client })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }

  async list({ body, query }: Request, res: Response) {
    try {
      // const clients = await clientsService.list(req.body)
      //
      // return res.send({
      //   result: clients
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
      const client = await this.clientUseCase.create(body)

      return res.send({
        result: client
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
      const client = await this.clientUseCase.update(params.id, body)

      return res.send({
        result: client
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
      const devices = await this.clientUseCase.remove(params.id)
      return res.send({ result: devices })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }

  // **********************************

  async readFile(req: Request, res: Response) {
    try {
      const files = req.files
      if (!files) throw new Error('No file was sent')
      const isFileSaved = await this.clientUseCase.saveUploadedClientFile(files)
      if (!isFileSaved) throw new Error('The file was saved')

      const parsedData = await this.clientUseCase.parseClientData()
      return res.send({ result: parsedData })
    } catch (e) {
      console.error(e)
      return res.status(500).send({
        message: `[CONTROLLER ERROR] ${e}`
      })
    }
  }
}
