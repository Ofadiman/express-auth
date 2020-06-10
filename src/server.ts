import mongoose from 'mongoose'
import { app } from 'app'

mongoose
  .connect('mongodb://localhost:27017/express-utils', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    useCreateIndex: true
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('App is running on port: 3000!')
    })
  })
  .catch(() => {
    console.log('Something went wrong while connecting to database.')
  })
