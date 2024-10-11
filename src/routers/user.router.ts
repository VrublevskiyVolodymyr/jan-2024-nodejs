import { Router } from "express";

import { avatarConfig } from "../constants/image.constant";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.get(
  "/:userId",
  userMiddleware.isIdValid("userId"),
  userController.getUser,
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid("userId"),
  userMiddleware.isBodyValid(UserValidator.updateUser),
  userController.update,
);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.put(
  "/me",
  authMiddleware.checkAccessToken,
  userMiddleware.isBodyValid(UserValidator.updateUser),
  userController.updateMe,
);

router.post(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isFileValid("avatar", avatarConfig),
  userController.uploadAvatar,
);

router.delete(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  userController.deleteAvatar,
);

router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.delete(
  "/:userId",
  userMiddleware.isIdValid("userId"),
  userController.delete,
);

export const userRouter = router;
