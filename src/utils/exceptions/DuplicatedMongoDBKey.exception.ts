import { _HttpException } from 'utils/exceptions/_Http.exception'

export class DuplicatedMongoDBKeyException extends _HttpException {
  constructor(message: string) {
    super(message, 400)
  }
}
