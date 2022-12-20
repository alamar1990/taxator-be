import { UserRepository } from '../domain/user.repository'
import { UserValue } from '../domain/user.value'

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser({
    name,
    email,
    password,
    description,
    role
  }: {
    name: string
    email: string
    password: string
    description: string
    role: string
  }) {
    const userValue = new UserValue({ name, email, password, role, description })
    const userCreated = await this.userRepository.registerUser(userValue)
    return userCreated
  }

  public getDetailUser = async (id: number) => {
    const user = await this.userRepository.findUserById(id)
    return user
  }

  public getAllUsers = async () => {
    const users = await this.userRepository.listUsers()
    return users
  }
  public registerUserAndNotify() {}
}
