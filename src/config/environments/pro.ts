import { Configuration } from '../'

const PRO: Configuration = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: +(process.env.PORT || 3000),
  DB_NAME: process.env.DB_NAME || '',
  DB_MYSQL_USERNAME: process.env.DB_MYSQL_USERNAME || '',
  DB_MYSQL_PASSWORD: process.env.DB_MYSQL_PASSWORD || '',
  DB_MONGO_USERNAME: process.env.DB_MONGO_USERNAME || '',
  DB_MONGO_PASSWORD: process.env.DB_MONGO_PASSWORD || '',
  APP_NAME: process.env.APP_NAME || 'taxator-be',
  DB_HOST: process.env.DB_HOST || '',
  APP_DATABASE_URL: process.env.APP_DATABASE_URL || '',
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'info'
}

export default PRO