import { Request, Response } from 'express'

import { authService } from 'auth/auth.service'
import { emailService } from 'email/email.service'
import { jwtService } from 'jwt/jwt.service'
import { userService } from 'user/user.service'
import { InvalidCredentialsException } from 'auth/exceptions/InvalidCredentials.exception'
import { MissingAccountActivationTokenException } from 'auth/exceptions/MissingAccountActivationToken.exception'
import { UserNotFoundException } from 'user/exceptions/UserNotFound.exception'
import { UserWithThatEmailAlreadyExistsException } from 'auth/exceptions/UserWithThatEmailAlreadyExists.exception'
import { withTryCatch } from 'utils/helpers/withTryCatch'

const registerUser = withTryCatch(async (req: Request, res: Response) => {
  const { email, password, username } = authService.validateCreateUserData(req.body)

  const existingUser = await userService.getUserByEmail(email)

  if (existingUser) throw new UserWithThatEmailAlreadyExistsException(email)

  const accountActivationJwt = jwtService.signAccountActivationJwt({ email, password, username })

  await emailService.sendRegistrationEmail({ username, to: email, jwt: accountActivationJwt })

  res.status(200).json({ message: 'Email with account activation details has been send to you.' })
})

const activateAccount = withTryCatch(async (req: Request, res: Response) => {
  const { accountActivationToken } = req.body

  if (!accountActivationToken) throw new MissingAccountActivationTokenException()

  const accountActivationJwtPayload = jwtService.verifyAccountActivationJwt(accountActivationToken)

  await userService.createUser({ ...accountActivationJwtPayload })

  res.status(201).json({ message: 'Successful account activation. Please login.' })
})

const login = withTryCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await userService.getUserWithHashedPasswordByEmail(email)

  if (!user) throw new UserNotFoundException()

  const isPasswordCorrect = authService.comparePasswords(password, user.hashedPassword)

  if (!isPasswordCorrect) throw new InvalidCredentialsException()

  const authJwt = await jwtService.signAuthenticationJwt(user._id)

  res.cookie('Authentication', `Bearer ${authJwt}`, {
    httpOnly: true
  })

  res
    .status(200)
    .json({ message: 'Successful authentication!', username: user.username, email: user.email })
})

export const authController = { registerUser, activateAccount, login }
