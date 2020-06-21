import { _HttpException } from 'utils/exceptions/_Http.exception'

export class InvalidJwtSignatureException extends _HttpException {
  constructor() {
    super('Invalid token signature.', 401)
  }
}
