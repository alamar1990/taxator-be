import mongoose from 'mongoose'
import { config } from '../../../../config'

const DB_URI = process.env.DB_URI || 'mongodb://localhost'

const mongoDbInit = async () => {
  try {
    mongoose.set('strictQuery', true)
    // @ts-ignore
    await mongoose.connect(DB_URI, {
      dbName: config.DB_SEQUELIZE_DBNAME,
      user: config.DB_MONGO_USERNAME,
      pass: config.DB_MONGO_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB database connected')
  } catch (e) {
    console.error(`[DB ERROR] ${e}`)
  }
}

export default mongoDbInit
