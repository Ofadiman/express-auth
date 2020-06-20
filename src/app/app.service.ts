import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express, Router } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { APP_CONFIG } from 'app/app.config'
import { errorMiddleware } from 'utils/middlewares/error.middleware'

const initializeDevelopmentMiddlewares = (app: Express): void => {
  if (APP_CONFIG.NODE_ENV === 'development') {
    // Development logging middlewares.
    app.use(morgan('dev'))
  }
}

const initializeProductionMiddlewares = (app: Express): void => {
  // Setting cors policy to allow access to api from every domain.
  app.use(cors())

  // Certain CORS requests are considered ‘complex’ and require an initial OPTIONS request (called the “pre-flight request”).
  // An example of a ‘complex’ CORS request is one that uses an HTTP verb other than GET/HEAD/POST or that uses custom headers.
  app.options('*', cors())

  // Setting secure Http headers.
  app.use(helmet())

  // Parsing cookies from the request.
  app.use(cookieParser())

  // Parsing JSON body from the request.
  app.use(express.json({ limit: '10kb' }))
}

const initializeRouters = (app: Express, routers: Router[]): void => {
  routers.forEach((router) => {
    app.use('/api/v1', router)
  })
}

const initializeErrorHandling = (app: Express): void => {
  app.use(errorMiddleware)
}

export const appService = {
  initializeDevelopmentMiddlewares,
  initializeErrorHandling,
  initializeProductionMiddlewares,
  initializeRouters
}
