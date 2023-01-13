import { DataTypes } from 'sequelize'
import { hash } from 'bcrypt'

import { mysqlDB } from '../../../../external/db/mysql'

const UserModel = mysqlDB.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uuid: {
      type: DataTypes.STRING,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: async function (user) {
        const hashedPassword = await hash(user.password, 10)
        user.password = hashedPassword
      }
    }
  }
)

export default UserModel
