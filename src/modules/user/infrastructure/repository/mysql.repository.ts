/**
 * Infra! MySql 🙌
 */
import { UserEntity } from '../../domain/user.entity'
import { UserRepository } from '../../domain/user.repository'
import UserModel from '../model/user.schema.sequelize'

/**
 * Mysql!
 */
export class MySqlRepository implements UserRepository {
  /*
   * CRUD methods***********************
   * */
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

  async update(id: number, userIn: UserEntity): Promise<UserEntity> {
    const user = await UserModel.update(userIn, {
      where: {
        id
      }
    })
    return user
  }

  async remove(id): Promise<UserEntity> {
    const user = await UserModel.destroy({
      where: {
        id: id
      }
    })
    return user
  }
  //**********************************************************
  async findByEmail(email): Promise<UserEntity> {
    const user = await UserModel.findOne({
      where: {
        email: email
      }
    })
    return user
  }
}
