import { Sequelize, Dialect } from 'sequelize'
import { config } from '../../../../config'

export const sequelize = config.DB_SEQUELIZE_URI
  ? new Sequelize(config.DB_SEQUELIZE_URI, {})
  : new Sequelize(config.DB_SEQUELIZE_DBNAME, config.DB_SEQUELIZE_USERNAME, config.DB_SEQUELIZE_PASSWORD, {
      host: config.DB_SEQUELIZE_HOST,
      port: config.DB_SEQUELIZE_PORT,
      dialect: <Dialect>config.DB_SEQUELIZE_DIALECT,
      dialectOptions: {
        // ssl: {
        //   require: false,
        //   rejectUnauthorized: false
        // }
      }
    })

export const sequelizeDbInit = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('database connected')
  } catch (e) {
    console.error(`[DB ERROR] ${e}`)
  }
}
