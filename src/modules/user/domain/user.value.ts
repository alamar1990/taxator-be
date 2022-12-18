import { UserEntity } from './user.entity'
import { v4 as uuid } from 'uuid'

export class UserValue implements UserEntity {
  description: string
  email: string
  name: string
  role: string
  uuid: string

  constructor({ name, email, description, role }: { name: string; email: string; description?: string; role: string }) {
    this.uuid = uuid()
    this.name = name
    this.role = role
    this.email = email
    this.description = description ?? 'default'
  }
}
