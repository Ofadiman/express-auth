import { _HttpException } from 'utils/exceptions/_Http.exception'

export class MissingAuthenticationTokenException extends _HttpException {
  constructor() {
    super('Authentication token not present in cookies.', 401)
  }
}
