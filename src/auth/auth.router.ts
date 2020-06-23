import { Router } from 'express'

import { authController } from 'auth/auth.controller'

export const authRouter = Router()

authRouter.post('/auth/register', authController.registerUser)
authRouter.post('/auth/activate-account', authController.activateAccount)
authRouter.post('/auth/login', authController.login)
authRouter.post('/auth/forgot-password', authController.forgotPassword)
authRouter.post('/auth/reset-password', authController.resetPassword)
