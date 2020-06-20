import { _HttpException } from 'utils/exceptions/_Http.exception'

export class UserNotFoundException extends _HttpException {
  constructor() {
    super('User not found.', 404)
  }
}
