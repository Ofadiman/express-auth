import express from 'express'
import morgan from 'morgan'

export const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ info: 'app works' })
})
