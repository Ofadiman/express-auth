import bcrypt from 'bcryptjs'

import { IRegisterUserData } from 'auth/typescript/RegisterUserData.interface'
import { InvalidEmailSyntaxException } from 'auth/exceptions/InvalidEmailSyntax.exception'
import { InvalidPasswordCharactersException } from 'auth/exceptions/InvalidPasswordCharacters.exception'
import { MismatchedPasswordsException } from 'auth/exceptions/MismatchedPasswords.exception'
import { MismatchedPropertyLengthException } from 'utils/exceptions/MismatchedPropertyLength.exception'
import { MismatchedPropertyTypeException } from 'utils/exceptions/MismatchedPropertyType.exception'
import { MissingPropertyKeyException } from 'utils/exceptions/MissingPropertyKey.exception'
import { validateConfirmationPassword } from 'utils/validators/validateConfirmationPassword'
import { validatePasswordCharacters } from 'utils/validators/validatePasswordCharacters'

const validateCreateUserData = (userData: any): IRegisterUserData => {
  const { username, email, password, confirmationPassword } = userData

  if (!email) throw new MissingPropertyKeyException('email')
  if (!username) throw new MissingPropertyKeyException('username')
  if (!password) throw new MissingPropertyKeyException('password')
  if (!confirmationPassword) throw new MissingPropertyKeyException('confirmationPassword')

  if (typeof username !== 'string')
    throw new MismatchedPropertyTypeException('username', 'string', typeof username)
  if (typeof email !== 'string')
    throw new MismatchedPropertyTypeException('email', 'string', typeof email)
  if (typeof password !== 'string')
    throw new MismatchedPropertyTypeException('password', 'string', typeof password)
  if (typeof confirmationPassword !== 'string')
    throw new MismatchedPropertyTypeException(
      'confirmationPassword',
      'string',
      typeof confirmationPassword
    )

  const emailRegex = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  )

  if (!emailRegex.test(email)) throw new InvalidEmailSyntaxException()

  if (username.length < 4) throw new MismatchedPropertyLengthException('username', 4, 'to-short')
  if (username.length > 20) throw new MismatchedPropertyLengthException('username', 20, 'to-long')

  if (password.length < 8) throw new MismatchedPropertyLengthException('password', 8, 'to-short')
  if (password.length > 20) throw new MismatchedPropertyLengthException('password', 32, 'to-long')

  const isPasswordValid = validatePasswordCharacters(password)
  const isConfirmationPasswordCorrect = validateConfirmationPassword(password, confirmationPassword)

  if (!isPasswordValid) throw new InvalidPasswordCharactersException()
  if (!isConfirmationPasswordCorrect) throw new MismatchedPasswordsException()

  return { username, email, password }
}

const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 12)

const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> =>
  bcrypt.compare(password, hashedPassword)

export const authService = { validateCreateUserData, hashPassword, comparePasswords }
