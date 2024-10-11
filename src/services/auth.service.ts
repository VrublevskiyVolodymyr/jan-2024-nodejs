import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import {
  IChangePassword,
  IResetPasswordSend,
  IResetPasswordSet,
  ISignIn,
  IUser,
} from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-tocken.repository";
import { oldPasswordRepository } from "../repositories/old-password.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: IUser,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.isEmailExist(dto.email);

    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });

    const tokens = await tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });

    const actionToken = tokenService.generateActionTokens(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.VERIFY_EMAIL,
    );
    await actionTokenRepository.create({
      type: ActionTokenTypeEnum.VERIFY_EMAIL,
      _userId: user._id,
      actionToken,
    });

    await emailService.sendEmail(EmailTypeEnum.WELCOME, dto.email, {
      name: dto.name,
      actionToken: actionToken,
    });

    return { user, tokens };
  }

  public async signIn(
    dto: ISignIn,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Invalid credentials", 401);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    const tokens = await tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async refresh(
    payload: ITokenPayload,
    oldTokenId: string,
  ): Promise<ITokenPair> {
    const tokens = await tokenService.generatePair({
      userId: payload.userId,
      role: payload.role,
    });
    await tokenRepository.create({ ...tokens, _userId: payload.userId });
    await tokenRepository.deleteById(oldTokenId);
    return tokens;
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }
  public async logout(
    jwtPayload: ITokenPayload,
    tokenId: string,
  ): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);
    await tokenRepository.deleteById(tokenId);
    await emailService.sendEmail(EmailTypeEnum.LOGOUT, user.email, {
      name: user.name,
    });
  }

  public async logoutAll(jwtPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);
    await tokenRepository.deleteManyByParams({ _userId: jwtPayload.userId });
    await emailService.sendEmail(EmailTypeEnum.LOGOUT, user.email, {
      name: user.name,
    });
  }

  public async forgotPasswordSendEmail(dto: IResetPasswordSend): Promise<void> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const actionToken = tokenService.generateActionTokens(
      { userId: user._id, role: user.role },
      ActionTokenTypeEnum.FORGOT_PASSWORD,
    );

    await actionTokenRepository.create({
      actionToken,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
      _userId: user._id,
    });

    await emailService.sendEmail(EmailTypeEnum.FORGOT_PASSWORD, user.email, {
      name: user.name,
      email: user.email,
      actionToken,
    });
  }

  public async forgotPasswordSet(
    dto: IResetPasswordSet,
    jwtPayload: ITokenPayload,
  ): Promise<void> {
    const password = await passwordService.hashPassword(dto.password);
    await userRepository.updateById(jwtPayload.userId, { password });

    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
    });
    await tokenRepository.deleteManyByParams({ _userId: jwtPayload.userId });
  }

  public async verify(jwtPayload: ITokenPayload): Promise<void> {
    await userRepository.updateById(jwtPayload.userId, { isVerified: true });
    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.VERIFY_EMAIL,
    });
  }

  public async changePassword(
    jwtPayload: ITokenPayload,
    dto: IChangePassword,
  ): Promise<void> {
    const [user, oldPasswords] = await Promise.all([
      userRepository.getById(jwtPayload.userId),
      oldPasswordRepository.findByParams(jwtPayload.userId),
    ]);
    const isPasswordCorrect = await passwordService.comparePassword(
      dto.oldPassword,
      "password" in user ? user.password : "",
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid previous password", 401);
    }

    const passwords = [
      ...oldPasswords,
      { password: "password" in user ? user.password : "" },
    ];
    await Promise.all(
      passwords.map(async (oldPassword) => {
        const isPrevious = await passwordService.comparePassword(
          dto.password,
          oldPassword.password,
        );
        if (isPrevious) {
          throw new ApiError("Password already used", 409);
        }
      }),
    );

    const password = await passwordService.hashPassword(dto.password);
    await userRepository.updateById(jwtPayload.userId, { password });
    await oldPasswordRepository.create({
      _userId: jwtPayload.userId,
      password: "password" in user ? user.password : "",
    });
    await tokenRepository.deleteManyByParams({ _userId: jwtPayload.userId });
  }
}

export const authService = new AuthService();
