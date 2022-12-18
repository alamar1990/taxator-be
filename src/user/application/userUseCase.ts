import { UserRepository } from '../domain/user.repository'
import { UserValue } from '../domain/user.value'

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser({
    name,
    email,
    description,
    role
  }: {
    name: string
    email: string
    description: string
    role: string
  }) {
    const userValue = new UserValue({ name, email, role, description })
    const userCreated = await this.userRepository.registerUser(userValue)
    return userCreated
  }

  public getDetailUSer = async (uuid: string) => {
    const user = await this.userRepository.findUserById(uuid)
    return user
  }

  public registerUserAndNotify() {}
}
