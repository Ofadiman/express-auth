import express from 'express'

import { appService } from 'app/app.service'
import { authRouter } from 'auth/auth.router'
import { userRouter } from 'user/user.router'

export const app = express()

appService.initializeDevelopmentMiddlewares(app)

appService.initializeProductionMiddlewares(app)

// Routers are best listed in the end of the app config.
appService.initializeRouters(app, [authRouter, userRouter])

// Error handling middlewares has to be listed as the last one.
appService.initializeErrorHandling(app)
