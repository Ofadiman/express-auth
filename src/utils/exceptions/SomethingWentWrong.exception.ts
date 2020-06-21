import { _HttpException } from 'utils/exceptions/_Http.exception'

export class SomethingWentWrongException extends _HttpException {
  constructor() {
    super('Something went wrong.', 500)
  }
}
