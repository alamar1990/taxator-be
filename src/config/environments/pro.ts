import { Configuration } from '../'

const PRO: Configuration = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: +(process.env.PORT || 3000),
  DB_SEQUELIZE_DBNAME: process.env.DB_SEQUELIZE_DBNAME || '',
  DB_SEQUELIZE_DIALECT: process.env.DB_SEQUELIZE_DIALECT || 'mysql',
  DB_SEQUELIZE_URI: process.env.DB_SEQUELIZE_URI || null,
  DB_SEQUELIZE_USERNAME: process.env.DB_SEQUELIZE_USERNAME || '',
  DB_SEQUELIZE_PASSWORD: process.env.DB_SEQUELIZE_PASSWORD || '',
  DB_MONGO_USERNAME: process.env.DB_MONGO_USERNAME || '',
  DB_MONGO_PASSWORD: process.env.DB_MONGO_PASSWORD || '',
  APP_NAME: process.env.APP_NAME || 'taxator-be',
  CLIENTS_UPLOADS_DIR: process.env.CLIENTS_UPLOADS_DIR || '/uploads/client',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',
  JWT_TOKEN_EXPIRATION: process.env.JWT_TOKEN_EXPIRATION || '1d',
  JWT_REFRESH_TOKEN_EXPIRATION: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '1d',
  DB_SEQUELIZE_HOST: process.env.DB_SEQUELIZE_HOST || '',
  DB_SEQUELIZE_PORT: process.env.DB_SEQUELIZE_PORT || undefined,
  APP_DATABASE_URL: process.env.APP_DATABASE_URL || '',
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'info'
}

export default PRO
