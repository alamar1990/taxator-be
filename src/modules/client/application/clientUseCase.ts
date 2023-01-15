import { ClientRepository } from '../domain/client.repository'
import { ClientValue } from '../domain/client.value'
import { Readable } from 'stream'
import * as fs from 'fs'
import { Request } from 'express'
import path from 'path'
import { config } from '../../../config'

export class ClientUseCase {
  // CRUD use cases
  constructor(private readonly clientRepository: ClientRepository) {}

  public async all() {
    const clients = await this.clientRepository.all()
    return clients
  }
  public async list() {}
  public async view(id: number) {
    const client = await this.clientRepository.view(id)
    return client
  }
  public async create({
    name,
    address,
    phone,
    s_ssn,
    p_ssn,
    agi,
    refund_due,
    package_id,
    prep_id,
    file_name
  }: {
    name: string
    address: string
    phone: number
    s_ssn: string
    p_ssn: string
    agi: number
    refund_due: number
    package_id: number
    prep_id: number
    file_name: string
  }) {
    const clientValue = new ClientValue({
      name,
      address,
      phone,
      s_ssn,
      p_ssn,
      agi,
      refund_due,
      package_id,
      prep_id,
      file_name
    })

    const clientCreated = await this.clientRepository.create(clientValue)
    return clientCreated
  }
  public async update(
    id,
    {
      name,
      address,
      phone,
      s_ssn,
      p_ssn,
      agi,
      refund_due,
      package_id,
      prep_id,
      file_name
    }: {
      name: string
      address: string
      phone: number
      s_ssn: string
      p_ssn: string
      agi: number
      refund_due: number
      package_id: number
      prep_id: number
      file_name: string
    }
  ) {
    const clientValue = new ClientValue({
      name,
      address,
      phone,
      s_ssn,
      p_ssn,
      agi,
      refund_due,
      package_id,
      prep_id,
      file_name
    })

    const exists = await this.clientRepository.view(id)
    if (!exists) {
      throw new Error(`Client with id ${id} not exists`)
    }

    const clientUpdated = await this.clientRepository.update(id, clientValue)
    return clientUpdated
  }
  public async remove(id: number) {
    const exists = await this.clientRepository.view(id)
    if (!exists) {
      throw new Error(`Client with id ${id} not exists`)
    }
    const removedClient = await this.clientRepository.remove(id)
    return removedClient
  }

  //*****************************

  public async saveUploadedClientFile(files: any) {
    try {
      let fileToSave = null
      fileToSave = files.file

      const fullFilePath = `${path.join(
        __dirname,
        '../../../../',
        config.CLIENTS_UPLOADS_DIR
      )}/${Date.now().toString()}-${fileToSave.name}`
      await fileToSave.mv(fullFilePath)
      return true
    } catch (e) {
      throw e
    }
  }

  public async parseClientData() {
    console.log({ id: true })
    // const contents = fs.readFile(fileToParse, { encoding: 'base64' })
    // const base64String = new Buffer(fileToParse.data).toString('base64')
    // const binaryData = fs.readFileSync(base64String, { encoding: 'base64' })
    //
    // const stream = Readable.from(fileToParse.data)

    const clientData = {}

    return clientData
  }
}
