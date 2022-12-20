import { UserRepository } from '../domain/user.repository'
import { UserValue } from '../domain/user.value'

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async all() {
    const users = await this.userRepository.all()
    return users
  }
  public async list() {}
  public async view(id: number) {
    const user = await this.userRepository.view(id)
    return user
  }
  public async create({
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
    const userCreated = await this.userRepository.create(userValue)
    return userCreated
  }
  public async update() {}
  public async remove() {}
}
