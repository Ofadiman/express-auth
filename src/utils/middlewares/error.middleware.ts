import { Request, Response, NextFunction } from 'express'

import { DuplicatedMongoDBKeyException } from 'utils/exceptions/DuplicatedMongoDBKey.exception'

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // MongoDB duplicate key exceptions
  if (err.code === 11000) {
    const { message, name, statusCode } = new DuplicatedMongoDBKeyException('duplicate mongo key')
    return res.status(statusCode).json({ message, name, statusCode })
  }

  // Mongoose model validation exceptions
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

  const { statusCode, message, name } = err
  return res.status(statusCode).json({
    message,
    name,
    statusCode
  })
}
