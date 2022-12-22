import { UserEntity } from './user.entity'

export interface UserRepository extends CRUDInterface<UserEntity> {
  // findUserById(id: number): Promise<UserEntity | null>
  findByEmail(user: object): Promise<UserEntity | null>
  updateUserById(user: object): Promise<UserEntity | null>

  registerUser(user: UserEntity): Promise<UserEntity | null>

  listUsers(): Promise<UserEntity[] | null>
}
