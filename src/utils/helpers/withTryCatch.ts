import { NextFunction, Request, RequestHandler, Response } from 'express'

export const withTryCatch = (fn: RequestHandler) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await fn(req, res, next)
  } catch (e) {
    next(e)
  }
}

// Alternative method of catching any async errors.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorCatcher = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
