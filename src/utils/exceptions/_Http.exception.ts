export class _HttpException extends Error {
  public isCustomAppError: boolean = true

  constructor(message: string, readonly statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
  }
}
