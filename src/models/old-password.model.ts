import mongoose from "mongoose";

import { IOldPassword } from "../interfaces/old-password.interface";
import { User } from "./user.model";

const { Schema } = mongoose;

const oldPasswordSchema = new Schema<IOldPassword>(
  {
    password: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OldPassword = mongoose.model("old-passwords", oldPasswordSchema);
