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
  async all(): Promise<UserEntity[]> {
    const users = await UserModel.findAll()
    return users
  }

  async create(userIn: UserEntity): Promise<UserEntity> {
    const user = new UserModel(userIn)
    await user.save()
    return user
  }

  async view(id): Promise<UserEntity> {
    const user = await UserModel.findByPk(id)
    return user
  }
  async updateUserById(id: number): Promise<UserEntity | null> {
    const user = await UserModel.findByPk({ id })

    return user
  }
}
