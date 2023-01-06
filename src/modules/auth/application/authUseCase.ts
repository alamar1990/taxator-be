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
      const accessToken = jwt.sign({ id: userWithEmail.id }, config.JWT_SECRET, {
        expiresIn: config.JWT_TOKEN_EXPIRATION
      })
      const refreshToken = jwt.sign({ id: userWithEmail.id }, config.JWT_REFRESH_SECRET, {
        expiresIn: config.JWT_REFRESH_TOKEN_EXPIRATION
      })
      if (!accessToken || !refreshToken) {
        throw new Error(`Error generating a token`)
      }
      return { accessToken, refreshToken }
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
      // const isExpired = this.isTokenExpired(exp)
      // if (isExpired) throw new Error('Provided token is expired')
      const userData = await this.getUserData(id)
      if (!userData) throw new Error('User by ID not found')
      const rawData = userData.toJSON()
      delete rawData?.password
      return rawData
    } catch (e) {
      throw e
    }
  }
  public async refreshToken(refreshToken: string) {
    try {
      const jwt_payload = jwt.decode(refreshToken)
      if (!jwt_payload) throw new Error('Provided refresh token is not valid')
      const { id, exp } = jwt_payload
      const isExpired = this.isTokenExpired(exp)
      if (isExpired) throw new Error('Provided refresh token is expired')
      const userData = await this.getUserData(id)
      if (!userData) throw new Error('User by ID not found')
      const jwtNewAccessToken = jwt.sign({ id: userData.id }, config.JWT_SECRET, {
        expiresIn: config.JWT_TOKEN_EXPIRATION
      })
      return jwtNewAccessToken
    } catch (e) {
      throw e
    }
  }
}
