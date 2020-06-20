import mongoose from 'mongoose'

import { APP_CONFIG } from 'app/app.config'

const connect = () =>
  mongoose
    .connect(
      `mongodb://${APP_CONFIG.MONGODB_HOST}:${APP_CONFIG.MONGODB_PORT}/${APP_CONFIG.DATABASE_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        useCreateIndex: true
      }
    )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Successful connection to database!')
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.error('Something went wrong while connecting to database.')
    })

export const databaseService = { connect }
