import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getList();
            res.json(result);
        } catch (e) {
            next(e);
        }
    }
    public async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId);
            const result = await userService.getUser(userId);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as any;
            const result = await userService.create(dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction){
        try {
            const dto = req.body as any;
            const userId = Number(req.params.userId);
            const result = await userService.update(dto,userId);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId);
            const result = await userService.delete(userId);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();