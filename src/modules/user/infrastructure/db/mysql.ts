import { Sequelize } from 'sequelize'
import { config } from '../../../../config'

export const mysqlDB = new Sequelize(config.DB_NAME, config.DB_MYSQL_USERNAME, config.DB_MYSQL_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql'
})

export const sequelizeDbInit = async () => {
  try {
    await mysqlDB.authenticate()
    await mysqlDB.sync()
    console.log('Mysql database connected')
  } catch (e) {
    console.error(`[DB ERROR] ${e}`)
  }
}
