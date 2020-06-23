import bcrypt from 'bcryptjs'

import { IRegisterUserData } from 'auth/typescript/RegisterUserData.interface'
import { validateConfirmationPassword } from 'utils/validators/validateConfirmationPassword'
import { validateEmail } from 'utils/validators/validateEmail'
import { validatePassword } from 'utils/validators/validatePassword'
import { validateUsername } from 'utils/validators/validateUsername'

const validateCreateUserData = (userData: any): IRegisterUserData => {
  const { username, email, password, confirmationPassword } = userData

  validatePassword(password)
  validateEmail(email)
  validateUsername(username)
  validateConfirmationPassword(password, confirmationPassword)

  return { username, email, password }
}

const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 12)

const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> =>
  bcrypt.compare(password, hashedPassword)

export const authService = { validateCreateUserData, hashPassword, comparePasswords }
