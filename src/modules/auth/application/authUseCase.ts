import { UserRepository } from '../../user/domain/user.repository'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../../../config'
import { UserUseCase } from '../../user/application/userUseCase'

export class AuthUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async getJwtToken({ email, password }: { email: string; password: string }) {
    const userWithEmail = await new UserUseCase(this.userRepository).findByEmail(email)

    if (!userWithEmail) {
      throw new Error(`Email or password does not match!`)
    }
    const match = await compare(password, userWithEmail.password)
    if (!match) {
      throw new Error(`Email or password does not match!`)
    }
    const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, config.JWT_SECRET, {
      expiresIn: '12h'
    })
    if (!jwtToken) {
      throw new Error(`Error generating token: ${jwtToken}`)
    }
    return jwtToken
  }
}
