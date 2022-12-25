import { UserRepository } from '../../user/domain/user.repository'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../../../config'
import { UserUseCase } from '../../user/application/userUseCase'

export class AuthUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async getJwtToken({ email, password }: { email: string; password: string }) {
    try {
      const userWithEmail = await new UserUseCase(this.userRepository).findByEmail(email)

      if (!userWithEmail) {
        throw new Error(`Email or password does not match!`)
      }
      const match = await compare(password, userWithEmail.password)
      if (!match) {
        throw new Error(`Email or password does not match!`)
      }
      const jwtToken = jwt.sign({ id: userWithEmail.id }, config.JWT_SECRET, {
        expiresIn: config.JWT_TOKEN_EXPIRATION
      })
      if (!jwtToken) {
        throw new Error(`Error generating token: ${jwtToken}`)
      }
      return jwtToken
    } catch (e) {
      throw e
    }
  }

  isTokenExpired(exp: number) {
    const tokenExpirationDate = new Date(exp * 1000)
    const today = new Date()
    return today > tokenExpirationDate
  }
  getUserData(id: number) {
    if (!id) throw new Error('No User ID provided')
    return new UserUseCase(this.userRepository).view(id)
  }
  public async getUser(token: string) {
    try {
      const jwt_payload = jwt.decode(token)
      if (!jwt_payload) throw new Error('Provided token is not valid')
      const { id, exp } = jwt_payload
      const isExpired = this.isTokenExpired(exp)
      if (isExpired) throw new Error('Provided token is expired')
      const userData = await this.getUserData(id)
      const rawData = userData.toJSON()
      delete rawData?.password
      return rawData
    } catch (e) {
      throw e
    }
  }
}
