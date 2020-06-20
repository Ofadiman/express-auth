import { _HttpException } from 'utils/exceptions/_Http.exception'

export class MismatchedPropertyTypeException extends _HttpException {
  constructor(
    propertyName: string,
    propertyExpectedType: string,
    propertyMismatchedType: typeof propertyExpectedType
  ) {
    super(
      `Property ${propertyName} has mismatched type of ${propertyMismatchedType}. The expected type is ${propertyExpectedType}.`,
      400
    )
  }
}
