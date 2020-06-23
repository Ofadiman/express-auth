import { InvalidEmailSyntaxException } from 'auth/exceptions/InvalidEmailSyntax.exception'
import { MissingPropertyKeyException } from 'utils/exceptions/MissingPropertyKey.exception'
import { MismatchedPropertyTypeException } from 'utils/exceptions/MismatchedPropertyType.exception'

export const validateEmail = (email: any) => {
  if (!email) throw new MissingPropertyKeyException('email')

  if (typeof email !== 'string')
    throw new MismatchedPropertyTypeException('email', 'string', typeof email)

  const emailRegex = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  )

  if (!emailRegex.test(email)) throw new InvalidEmailSyntaxException()
}
