// import mongoose, { Document, Model } from "mongoose";
//
// import { RoleEnum } from "../enums/role.enum";
// import { IUser } from "../interfaces/user.interface";
//
// const { Schema } = mongoose;
//
// export interface IUserDocument extends IUser, Document {}
//
// const userSchema = new Schema<IUserDocument>(
//   {
//     name: { type: String, required: true },
//     age: { type: Number, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: false },
//     role: {
//       type: String,
//       enum: RoleEnum,
//       required: true,
//       default: RoleEnum.USER,
//     },
//     isVerified: { type: Boolean, required: true, default: false },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );
//
// export const User: Model<IUserDocument> = mongoose.model<IUserDocument>("User", userSchema);
