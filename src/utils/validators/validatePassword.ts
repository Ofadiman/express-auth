import { InvalidPasswordCharactersException } from 'auth/exceptions/InvalidPasswordCharacters.exception'
import { MismatchedPropertyLengthException } from 'utils/exceptions/MismatchedPropertyLength.exception'
import { MismatchedPropertyTypeException } from 'utils/exceptions/MismatchedPropertyType.exception'
import { MissingPropertyKeyException } from 'utils/exceptions/MissingPropertyKey.exception'

export const validatePassword = (password: any): void => {
  if (!password) throw new MissingPropertyKeyException('password')

  if (typeof password !== 'string')
    throw new MismatchedPropertyTypeException('password', 'string', typeof password)

  if (password.length < 8) throw new MismatchedPropertyLengthException('password', 8, 'to-short')

  if (password.length > 20) throw new MismatchedPropertyLengthException('password', 32, 'to-long')

  if (
    !password.match(/[a-z]/) ||
    !password.match(/[A-Z]/) ||
    !password.match(/[0-9]/) ||
    password.match(/\s/)
  )
    throw new InvalidPasswordCharactersException()
}
