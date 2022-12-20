import { UserEntity } from '../../domain/user.entity'
import { UserRepository } from '../../domain/user.repository'

/**
 * MOCK!
 */

const MOCK_USER = {
  name: 'Alain',
  description: 'hola',
  role: 'admin',
  uuid: '000-000'
}

export class MockRepository implements UserRepository {
  async findUserById(uuid: string): Promise<any> {
    const user = MOCK_USER
    return user
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async registerUser(userIn: UserEntity): Promise<any> {
    const user = MOCK_USER
    return user
  }

  async listUsers(): Promise<any> {
    const users = [MOCK_USER, MOCK_USER, MOCK_USER]
    return users
  }
}
