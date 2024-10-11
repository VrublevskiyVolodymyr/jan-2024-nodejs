import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  userMiddleware.isBodyValid(UserValidator.createUser),
  authController.signUp,
);
router.post(
  "/sign-in",
  userMiddleware.isBodyValid(UserValidator.login),
  authController.signIn,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);
router.post("/logout", authMiddleware.checkAccessToken, authController.logout);

router.post(
  "/logout/all",
  authMiddleware.checkAccessToken,
  authController.logoutAll,
);

router.post("/forgot-password", authController.forgotPasswordSendEmail);

router.put(
  "/forgot-password",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
  userMiddleware.isBodyValid(UserValidator.forgotPassword),
  authController.forgotPasswordSet,
);

router.post(
  "/change-password",
  authMiddleware.checkAccessToken,
  userMiddleware.isBodyValid(UserValidator.changePassword),
  authController.changePassword,
);

router.post(
  "/verify",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_EMAIL),
  authController.verify,
);

export const authRouter = router;
