import { IActionToken } from "../interfaces/action-token.interface";
import { ActionToken } from "../models/action-token.model";

class ActionTokenRepository {
  public async create(dto: Partial<IActionToken>): Promise<IActionToken> {
    return await ActionToken.create(dto);
  }

  public async getByToken(actionToken: string): Promise<IActionToken> {
    return await ActionToken.findOne({ actionToken });
  }

  public async deleteManyByParams(
    params: Partial<IActionToken>,
  ): Promise<void> {
    await ActionToken.deleteMany(params);
  }
}

export const actionTokenRepository = new ActionTokenRepository();
