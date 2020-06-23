import { MismatchedPasswordsException } from 'auth/exceptions/MismatchedPasswords.exception'
import { MissingPropertyKeyException } from 'utils/exceptions/MissingPropertyKey.exception'
import { MismatchedPropertyTypeException } from 'utils/exceptions/MismatchedPropertyType.exception'

export const validateConfirmationPassword = (password: string, confirmationPassword: any) => {
  if (!confirmationPassword) throw new MissingPropertyKeyException('confirmationPassword')

  if (typeof confirmationPassword !== 'string')
    throw new MismatchedPropertyTypeException(
      'confirmationPassword',
      'string',
      typeof confirmationPassword
    )
  // eslint-disable-next-line security/detect-possible-timing-attacks
  if (password !== confirmationPassword) throw new MismatchedPasswordsException()
}
