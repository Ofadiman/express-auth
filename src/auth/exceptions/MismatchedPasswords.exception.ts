import { _HttpException } from 'utils/exceptions/_Http.exception'

export class MismatchedPasswordsException extends _HttpException {
  constructor() {
    super(`Properties password and confirmationPassword are not equal.`, 400)
  }
}
