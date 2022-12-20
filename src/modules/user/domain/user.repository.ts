import { UserEntity } from './user.entity'

export interface UserRepository {
  /*
   * CRUD
   * */
  all(): Promise<UserEntity[] | null>
  list(): Promise<UserEntity[] | null>
  view(): Promise<UserEntity | null>
  create(): Promise<UserEntity | null>
  update(): Promise<UserEntity | null>
  remove(): Promise<UserEntity | null>
  //****************************************

  // findUserById(id: number): Promise<UserEntity | null>
  updateUserById(user: object): Promise<UserEntity | null>

  registerUser(user: UserEntity): Promise<UserEntity | null>

  listUsers(): Promise<UserEntity[] | null>
}
