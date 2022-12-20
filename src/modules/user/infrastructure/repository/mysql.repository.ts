/**
 * Infra! Mongo 🙌
 */
import { UserEntity } from '../../domain/user.entity'
import { UserRepository } from '../../domain/user.repository'
import UserModel from '../model/user.schema.sequelize'

/**
 * Mysql!
 */
export class MySqlRepository implements UserRepository {
  async findUserById(id: number): Promise<any> {
    const user = await UserModel.findByPk({ id })
    return user
  }

  async registerUser(userIn: UserEntity): Promise<any> {
    const user = new UserModel(userIn)
    await user.save()
    return user
  }

  async listUsers(): Promise<any> {
    const users = await UserModel.findAll()
    return users
  }
}
