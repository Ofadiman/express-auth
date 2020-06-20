import { Schema, model } from 'mongoose'

import { IUserModel } from 'user/typescript/UserModel.interface'

const UserSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  hashedPassword: { select: false, type: String },
  createdAt: { default: new Date().toISOString(), type: String }
})

export const UserModel = model<IUserModel>('User', UserSchema)
