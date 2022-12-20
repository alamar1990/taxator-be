import { UserEntity } from './user.entity'
import { v4 as uuid } from 'uuid'

export class UserValue implements UserEntity {
  description: string
  email: string
  password: string
  name: string
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
    this.uuid = uuid()
    this.name = name
    this.password = password
    this.role = role
    this.email = email
    this.description = description ?? 'default'
  }
}
