import mongoose from "mongoose";

import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { IActionToken } from "../interfaces/action-token.interface";
import { User } from "./user.model";

const { Schema } = mongoose;

const actionTokenSchema = new Schema<IActionToken>(
  {
    actionToken: { type: String, required: true },
    type: { type: String, required: true, enum: ActionTokenTypeEnum },

    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ActionToken = mongoose.model("action-tokens", actionTokenSchema);
