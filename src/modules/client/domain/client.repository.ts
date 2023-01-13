import { ClientEntity } from './client.entity'

export interface ClientRepository extends CRUDInterface<ClientEntity> {
  gatherClientData(client: object): Promise<ClientEntity | null>
}
