import { Sequelize } from 'sequelize'
import { config } from '../../../../config'

export const sequelize = new Sequelize(config.DB_NAME, config.DB_MYSQL_USERNAME, config.DB_MYSQL_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql'
})

export const sequelizeDbInit = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Mysql database connected')
  } catch (e) {
    console.error(`[DB ERROR] ${e}`)
  }
}
