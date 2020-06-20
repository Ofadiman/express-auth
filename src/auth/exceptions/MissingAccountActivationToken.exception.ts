import { _HttpException } from 'utils/exceptions/_Http.exception'

export class MissingAccountActivationTokenException extends _HttpException {
  constructor() {
    super('Property `accountActivationToken` is not present in req.body.', 422)
  }
}
