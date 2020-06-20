import { Request, Response } from 'express'

import { withTryCatch } from 'utils/helpers/withTryCatch'
import { userService } from 'user/user.service'

const getUserById = withTryCatch(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.body.userId)
  res.json({ user })
})

export const userController = { getUserById }
