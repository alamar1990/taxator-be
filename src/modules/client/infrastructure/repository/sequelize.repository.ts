/**
 * Infra! MySql 🙌
 */
import { ClientRepository } from '../../domain/client.repository'
import ClientModel from '../../../client/infrastructure/model/client.schema.sequelize'
import { ClientEntity } from '../../domain/client.entity'

/**
 * Mysql!
 */
export class SequelizeRepository implements ClientRepository {
  /*
   * CRUD methods***********************
   * */
  async all(): Promise<ClientEntity[]> {
    const clients = await ClientModel.findAll()
    return clients
  }

  async create(clientIn: ClientEntity): Promise<ClientEntity> {
    const client = new ClientModel(clientIn)
    await client.save()
    return client
  }

  async view(id): Promise<ClientEntity> {
    const client = await ClientModel.findByPk(id)
    return client
  }

  async update(id: number, clientIn: ClientEntity): Promise<ClientEntity> {
    const client = await ClientModel.update(clientIn, {
      where: {
        id
      }
    })
    return client
  }

  async remove(id): Promise<ClientEntity> {
    const client = await ClientModel.destroy({
      where: {
        id: id
      }
    })
    return client
  }
  //**********************************************************
}
