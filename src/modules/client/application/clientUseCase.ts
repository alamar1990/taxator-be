import * as fs from 'fs'
import path from 'path'
import * as readline from 'readline'
import { config } from '../../../config'
import { parseName } from './utils/parseFunctions'
import { ClientRepository } from '../domain/client.repository'
import { ClientValue } from '../domain/client.value'

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
      return fullFilePath
    } catch (e) {
      throw e
    }
  }

  public async parseClientData() {
    const fullFilePath = `${path.join(__dirname, '../../../../', config.CLIENTS_UPLOADS_DIR)}/1673766276530-a.txt`
    const fileStream = fs.createReadStream(fullFilePath)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
    const clientData = {}

    let lineNumber = 1
    for await (const line of rl) {
      console.log(`${lineNumber} -> ${line}`)

      if (lineNumber === 4) {
        const name = parseName(line)
        clientData.name = name
      }

      lineNumber++
    }

    return clientData
  }
}
