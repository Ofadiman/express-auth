import { Router } from 'express'

import { userController } from 'user/user.controller'

export const userRouter = Router()

userRouter.get('/user/:id', userController.getUserById)
