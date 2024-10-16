import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { MeasureExecutionTime } from "../decorators/measure-time.decorator";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserListQuery } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

class UserController {
  @MeasureExecutionTime
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IUserListQuery;
      const result = await userService.getList(query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const result = await userService.getById(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      const result = await userService.getMe(jwtPayload);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as IUser;

      const result = await userService.updateMe(jwtPayload, dto);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      await userService.deleteMe(jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const userId = req.params.userId;
      const result = await userService.updateById(userId, dto);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const avatar = req.files.avatar as UploadedFile;

      const user = await userService.uploadAvatar(jwtPayload, avatar);
      const result = userPresenter.toPublicResDto(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      const user = await userService.deleteAvatar(jwtPayload);
      const result = userPresenter.toPublicResDto(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const result = await userService.deleteById(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
