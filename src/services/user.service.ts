import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public async getList(): Promise<IUser[]> {
        return await userRepository.getList();
    }

    public async getUser(userId:number): Promise<IUser> {
        if (userId < 0 || Number.isNaN(userId)) {
            throw new ApiError('Not valid ID', 400);
        }

        return await userRepository.getUser(userId);
    }

    public async create(dto: IUser): Promise<IUser> {
        const { name, email, password } = dto;

        if (!name || name.length < 3) {
            throw new ApiError(
                "Name is required and should be at least 3 characters",
                400,
            );
        }
        if (!email || !email.includes("@")) {
            throw new ApiError("Email is required and should be valid", 400);
        }
        if (!password || password.length < 6) {
            throw new ApiError(
                "Password is required and should be at least 6 characters",
                400,
            );
        }
        return await userRepository.create(dto);
    }

    public async update(dto: IUser, userId:number): Promise<IUser> {
        const { name, email, password } = dto;

        if (userId < 0 || Number.isNaN(userId)) {
            throw new ApiError('Not valid ID', 400);
        }

        if (name && name.length < 3) {
            throw new ApiError(
                "Name should be at least 3 characters",
                400,
            );
        }
        if (email && !email.includes("@")) {
            throw new ApiError("Email should be valid", 400);
        }
        if (password && password.length < 6) {
            throw new ApiError(
                "Password should be at least 6 characters",
                400,
            );
        }
        return await userRepository.update(dto, userId);
    }

    public async delete(userId:number): Promise<{ message: string; status: number }> {
        if (userId < 0 || Number.isNaN(userId)) {
            throw new ApiError('Not valid ID', 400);
        }
        return await userRepository.delete(userId);
    }

}

export const userService = new UserService();