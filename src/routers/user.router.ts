import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
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

router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.delete(
  "/:userId",
  userMiddleware.isIdValid("userId"),
  userController.delete,
);

export const userRouter = router;
