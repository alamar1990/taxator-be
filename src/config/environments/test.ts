import { Configuration } from '../'

const DEV: Configuration = {
  NODE_ENV: 'test',
  PORT: +(process.env.PORT || 3000),
  APP_NAME: process.env.APP_NAME || 'taxator-test-be',
  APP_DATABASE_URL: process.env.APP_DATABASE_URL || '',
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'debug'
}

export default DEV
