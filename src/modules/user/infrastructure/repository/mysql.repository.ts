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
  async findUserById(id: number): Promise<UserEntity> {
    const user = await UserModel.findByPk({ id })
    return user
  }

  async registerUser(userIn: UserEntity): Promise<UserEntity> {
    const user = new UserModel(userIn)
    await user.save()
    return user
  }

  async listUsers(): Promise<UserEntity[]> {
    const users = await UserModel.findAll()
    return users
  }
}
