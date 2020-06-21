import { decode, sign, verify } from 'jsonwebtoken'

import { APP_CONFIG } from 'app/app.config'
import { IRegisterUserData } from 'auth/typescript/RegisterUserData.interface'
import { IAuthenticationJwtData } from 'auth/typescript/AuthenticationJwtData.interface'

// Maximum JWT size is ~7kb, because all request headers have to weigh ~8kb utmost.

const signAccountActivationJwt = (payload: IRegisterUserData): string =>
  sign(payload, APP_CONFIG.JWT_SECRET_ACCOUNT_ACTIVATION, {
    expiresIn: APP_CONFIG.JWT_EXPIRES_IN_ACCOUNT_ACTIVATION
  })

const verifyAccountActivationJwt = (token: string): IRegisterUserData =>
  verify(token, APP_CONFIG.JWT_SECRET_ACCOUNT_ACTIVATION) as IRegisterUserData

const signAuthenticationJwt = (payload: string): string =>
  sign({ userId: payload }, APP_CONFIG.JWT_SECRET_LOGIN, {
    expiresIn: APP_CONFIG.JWT_EXPIRES_IN_LOGIN
  })

const verifyAuthenticationJwt = (token: string): IAuthenticationJwtData =>
  verify(token, APP_CONFIG.JWT_SECRET_LOGIN) as IAuthenticationJwtData

const decodeJwt = (token: string) => decode(token)

export const jwtService = {
  verifyAccountActivationJwt,
  decodeJwt,
  signAccountActivationJwt,
  signAuthenticationJwt,
  verifyAuthenticationJwt
}
