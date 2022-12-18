import mongoose from 'mongoose'

const DB_URI = process.env.DB_URI || 'mongodb://localhost'

const dbInit = async () => {
  try {
    mongoose.set('strictQuery', true)
    // @ts-ignore
    await mongoose.connect(DB_URI, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB database connected')
  } catch (e) {
    console.error(`[DB ERROR] ${e}`)
  }
}

export default dbInit
