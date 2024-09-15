import { Prisma, UserToken } from '@prisma/client';

import { SaveUserTokenDto } from '@src/api/auth/dtos/save-user-token.dto';
import { TokenPayloadDto } from '@src/api/auth/dtos/token-payload.dto';

export interface ITokenService {
  generateToken(payload: TokenPayloadDto): string;
  findTokens(userTokenFindUniqueArgs: Prisma.UserTokenFindUniqueArgs): Promise<UserToken | null>;
  saveTokens(saveUserToken: SaveUserTokenDto): Promise<void>;
  deleteTokens(userId: number): Promise<void>;
}
