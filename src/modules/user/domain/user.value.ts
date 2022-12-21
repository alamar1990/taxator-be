import { UserEntity } from './user.entity'
import { v4 as uuid } from 'uuid'

export class UserValue implements UserEntity {
  name: string
  email: string
  password: string
  description: string
  role: string
  uuid: string

  constructor({
    name,
    email,
    password,
    description,
    role
  }: {
    name: string
    email: string
    password: string
    description?: string
    role: string
  }) {
    this.name = name
    this.email = email
    this.password = password
    this.uuid = uuid()
    this.description = description ?? 'default'
    this.role = role
  }
}
