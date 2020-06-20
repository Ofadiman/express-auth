import { _HttpException } from 'utils/exceptions/_Http.exception'

export class UserWithThatEmailAlreadyExistsException extends _HttpException {
  constructor(email: string) {
    super(`User with ${email} already exists.`, 400)
  }
}
