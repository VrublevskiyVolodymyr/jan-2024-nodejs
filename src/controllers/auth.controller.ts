import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import {
  IChangePassword,
  IResetPasswordSend,
  IResetPasswordSet,
  IUser,
} from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const oldTokensId = req.res.locals.oldTokensId as string;
      const result = await authService.refresh(jwtPayload, oldTokensId);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenId = req.res.locals.tokenId as string;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      await authService.logout(jwtPayload, tokenId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      await authService.logoutAll(jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotPasswordSendEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dto = req.body as IResetPasswordSend;
      await authService.forgotPasswordSendEmail(dto);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotPasswordSet(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as IResetPasswordSet;

      await authService.forgotPasswordSet(dto, jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      await authService.verify(jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as IChangePassword;

      await authService.changePassword(jwtPayload, dto);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
