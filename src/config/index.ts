import * as dotenv from 'dotenv'

dotenv.config()

import PRODUCTION from './environments/pro'
import DEVELOPMENT from './environments/dev'
import TEST from './environments/test'

const { NODE_ENV } = process.env

export type Configuration = {
  NODE_ENV: string
  PORT: number
  DB_MYSQL_USERNAME: string
  DB_MYSQL_PASSWORD: string
  DB_MONGO_USERNAME: string
  DB_MONGO_PASSWORD: string
  DB_USERNAME: string
  APP_NAME: string
  DB_NAME: string
  DB_HOST: string
  APP_DATABASE_URL: string

  APP_LOG_LEVEL: string
}

let currentConfig: Configuration = DEVELOPMENT

switch (NODE_ENV) {
  case 'production':
    currentConfig = PRODUCTION
    break
  case 'test':
    currentConfig = TEST
    break
  default:
    currentConfig = DEVELOPMENT
}

export { currentConfig as config }
