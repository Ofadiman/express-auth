import { _HttpException } from 'utils/exceptions/_Http.exception'

export class InvalidCredentialsException extends _HttpException {
  constructor() {
    super('Invalid credentials. Please provide correct email and password.', 401)
  }
}
