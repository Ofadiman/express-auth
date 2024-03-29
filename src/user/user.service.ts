import { IRegisterUserData } from 'auth/typescript/RegisterUserData.interface'
import { IUserModel } from 'user/typescript/UserModel.interface'
import { UserModel } from 'user/user.model'
import { UserNotFoundException } from 'user/exceptions/UserNotFound.exception'
import { authService } from 'auth/auth.service'

const getUserById = async (userId: string): Promise<IUserModel | null> => {
  const user = await UserModel.findById(userId)

  if (!user) throw new UserNotFoundException()

  return user
}

const getUserByEmail = async (email: string): Promise<IUserModel | null> => {
  const user = UserModel.findOne({ email })

  if (!user) throw new UserNotFoundException()

  return user
}

const getUserWithHashedPasswordByEmail = async (email: string): Promise<IUserModel | null> => {
  const user = UserModel.findOne({ email }, '+hashedPassword')

  if (!user) throw new UserNotFoundException()

  return user
}

const createUser = async (newUserData: IRegisterUserData): Promise<IUserModel> => {
  const { email, password, username } = newUserData

  const hashedPassword = await authService.hashPassword(password)

  return UserModel.create({ email, username, hashedPassword })
}

const findOneAndUpdate = async <T>(email: string, data: Partial<T>) => {
  await UserModel.findOneAndUpdate({ email }, data)
}

export const userService = {
  getUserById,
  getUserByEmail,
  createUser,
  getUserWithHashedPasswordByEmail,
  findOneAndUpdate
}
