import { _HttpException } from 'utils/exceptions/_Http.exception'

export class MissingPropertyKeyException extends _HttpException {
  constructor(propertyName: string) {
    super(`Property ${propertyName} is not missing in request.body`, 400)
  }
}
