import { Request, Response, NextFunction } from 'express'

import { DuplicatedMongoDBKeyException } from 'utils/exceptions/DuplicatedMongoDBKey.exception'
import { SomethingWentWrongException } from 'utils/exceptions/SomethingWentWrong.exception'
import { APP_CONFIG } from 'app/app.config'
import { InvalidJwtSignatureException } from 'auth/exceptions/InvalidJwtSignature.exception'

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // Handle mongoDB duplicate key error.
  if (err.code === 11000) {
    const { message, name, statusCode } = new DuplicatedMongoDBKeyException('duplicate mongo key')
    return res.status(statusCode).json({ message, name, statusCode })
  }

  // Handle mongoose model validation error.
  if (err.name === 'ValidationError') {
    interface IValidationError {
      [key: string]: {
        properties: {
          message: string
          type: string
          path: string
          value: string
        }
        kind: string
        path: string
        value: string
      }
    }

    // eslint-disable-next-line no-console
    console.log(Object.values(err.errors).map((el) => (el as any).message))
    // console.log(Object.values(err as IValidationError).map((el) => el.properties.message))
    // return res.status(400).json({ name: 'Validation exceptions', statusCode: 400, message: '' })
    return res.json(err)
  }

  // Handle invalid jwt structure errors.
  if (err.name === 'JsonWebTokenError') {
    const { message, statusCode, name } = new InvalidJwtSignatureException()

    return res.status(statusCode).json({ name, message })
  }

  // Handle custom app errors that have been thrown intentionally.
  if (err.isCustomAppError) {
    const { statusCode, message, name } = err
    return res.status(statusCode).json({
      message,
      name
    })
  }

  // Catch all uncaught errors in development and send the whole error object.
  if (APP_CONFIG.NODE_ENV === 'development') {
    return res.status(500).json({ err })
  }

  // If unknown error occurs, handle it by sending general error.
  const { statusCode, message, name } = new SomethingWentWrongException()
  return res.status(statusCode).json({
    message,
    name
  })
}
