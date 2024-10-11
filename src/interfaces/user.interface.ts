import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: RoleEnum;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISignIn extends Pick<IUser, "email" | "password"> {}

export type IResetPasswordSend = Pick<IUser, "email">;

export type IResetPasswordSet = Pick<IUser, "password"> & { token: string };

export type IChangePassword = Pick<IUser, "password"> & { oldPassword: string };
