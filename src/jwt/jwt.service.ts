import { decode, sign, verify } from 'jsonwebtoken'

import { APP_CONFIG } from 'app/app.config'
import { IRegisterUserData } from 'auth/typescript/RegisterUserData.interface'
import { IAuthenticationJwtData } from 'auth/typescript/AuthenticationJwtData.interface'
import { IPasswordResetJwtData } from 'auth/typescript/PasswordResetJwtData.interface'

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

const signPasswordResetJwt = (email: string): string =>
  sign({ email }, APP_CONFIG.JWT_SECRET_PASSWORD_RESET, {
    expiresIn: APP_CONFIG.JWT_EXPIRES_IN_PASSWORD_RESET
  })

const verifyPasswordResetJwt = (token: string): IPasswordResetJwtData =>
  verify(token, APP_CONFIG.JWT_SECRET_PASSWORD_RESET) as IPasswordResetJwtData

const decodeJwt = (token: string) => decode(token)

export const jwtService = {
  decodeJwt,
  signAccountActivationJwt,
  signAuthenticationJwt,
  signPasswordResetJwt,
  verifyAccountActivationJwt,
  verifyAuthenticationJwt,
  verifyPasswordResetJwt
}
