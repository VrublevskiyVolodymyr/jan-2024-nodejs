import {ApiError} from "../errors/api.error";
import {fsService} from "../services/fs.service";
import {IUser} from "../interfaces/user.interface";

class UserRepository {
    public async getList(): Promise<IUser[]> {
        return await fsService.read();
    }

    public async create(dto: IUser): Promise<IUser> {
        const users = await fsService.read();
        const index = users.findIndex((user) => user.email === dto.email);
        if (index !== -1) {
            throw new ApiError("User with this email already exists", 409);
        }
        const newUser = {
            id: users[users.length - 1].id + 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        };
        users.push(newUser);
        await fsService.write(users);
        return newUser;
    }

    public async getUser(userId: number): Promise<IUser> {
        const users = await fsService.read();
        const user = users.find(user => user.id === userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        return user;
    }

    public async update(dto: IUser, userId: number): Promise<IUser> {
        const users = await fsService.read();
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            throw new ApiError("User not found", 404);
        }

        const updatedUser = {...users[userIndex], ...dto};
        users[userIndex] = updatedUser;

        await fsService.write(users);

        return updatedUser;
    }


    public async delete(userId: number): Promise<{ message: string; status: number }> {
        const users = await fsService.read();
        const index = users.findIndex(user => user.id === userId);
        if (index === -1) {
            throw new ApiError("User not found", 404);
        }
        users.splice(index, 1);
        await fsService.write(users);

        return {
            message: `User with id ${userId} is deleted`,
            status: 204
        };
    }


}

export const userRepository = new UserRepository();