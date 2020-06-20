import { decode, sign, verify } from 'jsonwebtoken'

import { APP_CONFIG } from 'app/app.config'
import { IRegisterUserData } from 'auth/typescript/RegisterUserData.interface'

// Maximum JWT size is ~7kb, because all request headers have to weigh ~8kb utmost.

const signAccountActivationJwt = (payload: IRegisterUserData) =>
  sign(payload, APP_CONFIG.JWT_SECRET_ACCOUNT_ACTIVATION, {
    expiresIn: APP_CONFIG.JWT_EXPIRES_IN_ACCOUNT_ACTIVATION
  })

const verifyAccountActivationJwt = (token: string): IRegisterUserData => {
  return verify(token, APP_CONFIG.JWT_SECRET_ACCOUNT_ACTIVATION) as IRegisterUserData
}

const decodeJwt = (token: string) => decode(token)

export const jwtService = { verifyAccountActivationJwt, decodeJwt, signAccountActivationJwt }
