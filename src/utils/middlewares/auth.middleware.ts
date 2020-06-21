import { Request, Response, NextFunction } from 'express'

import { MissingAuthenticationTokenException } from 'auth/exceptions/MissingAuthenticationToken.exception'
import { jwtService } from 'jwt/jwt.service'

export const requireJwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const authTokenString = req.cookies.Authentication

  if (!authTokenString) throw new MissingAuthenticationTokenException()

  const authToken = authTokenString.replace('Bearer ', '')

  jwtService.verifyAuthenticationJwt(authToken)

  next()
}
