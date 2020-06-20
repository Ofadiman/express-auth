import { _HttpException } from 'utils/exceptions/_Http.exception'

export class MismatchedPropertyLengthException extends _HttpException {
  constructor(propertyName: string, length: number, type: 'to-short' | 'to-long') {
    switch (type) {
      case 'to-long':
        super(`Property ${propertyName} is too long. Maximum length is: ${length} characters.`, 400)
        break
      case 'to-short':
        super(
          `Property ${propertyName} is too short. Minimum length is: ${length} characters.`,
          400
        )
        break
      default:
        throw new Error(`There is no handler for type: ${type}.`)
    }
  }
}
