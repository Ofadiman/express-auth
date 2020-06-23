import { _HttpException } from 'utils/exceptions/_Http.exception'

export class InvalidPasswordCharactersException extends _HttpException {
  constructor() {
    super(
      'Password has to contain at least 1 lowercase letter, 1 uppercase letter and 1 number and cannot contain any whitespace.',
      404
    )
  }
}
