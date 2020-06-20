import { Document } from 'mongoose'
import { IUser } from 'user/typescript/User.interface'

export interface IUserModel extends IUser, Document {
  createdAt?: string
}
