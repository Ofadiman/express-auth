import { _HttpException } from 'utils/exceptions/_Http.exception'

export class MissingPropertyKeyException extends _HttpException {
  constructor(propertyName: string) {
    super(`Property ${propertyName} is missing from request.body`, 400)
  }
}
