import express, { NextFunction, Request, Response } from "express";
import fileupload from "express-fileupload";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { cronRunner } from "./crones";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
      message: err.message || "Unknown error",
      status: err.status || 500,
    });
  },
);
process.on("uncaughtException", (e) => {
  console.error("uncaughtException", e.message, e.stack);
  process.exit(1);
});

app.listen(configs.APP_PORT, configs.APP_HOST, async () => {
  await mongoose.connect(configs.MONGO_URL);
  cronRunner();
  console.log(`Server is running on port ${configs.APP_PORT}`);
});
