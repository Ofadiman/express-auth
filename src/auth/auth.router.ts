import { Router } from 'express'

import { authController } from 'auth/auth.controller'

export const authRouter = Router()

authRouter.post('/auth/register', authController.registerUser)
authRouter.post('/auth/activate-account', authController.activateAccount)
