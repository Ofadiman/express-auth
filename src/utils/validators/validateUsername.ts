import { MissingPropertyKeyException } from 'utils/exceptions/MissingPropertyKey.exception'
import { MismatchedPropertyTypeException } from 'utils/exceptions/MismatchedPropertyType.exception'
import { MismatchedPropertyLengthException } from 'utils/exceptions/MismatchedPropertyLength.exception'

export const validateUsername = (username: any) => {
  if (!username) throw new MissingPropertyKeyException('username')

  if (typeof username !== 'string')
    throw new MismatchedPropertyTypeException('username', 'string', typeof username)

  if (username.length < 4) throw new MismatchedPropertyLengthException('username', 4, 'to-short')
  if (username.length > 20) throw new MismatchedPropertyLengthException('username', 20, 'to-long')
}
