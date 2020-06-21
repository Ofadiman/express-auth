import { _HttpException } from 'utils/exceptions/_Http.exception'

export class InvalidEmailSyntaxException extends _HttpException {
  constructor() {
    super('Invalid email syntax.', 400)
  }
}
