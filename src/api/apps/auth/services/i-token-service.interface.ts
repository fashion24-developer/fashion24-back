import { SaveUserTokenDto } from '@src/api/apps/auth/dtos/save-user-token.dto';
import { TokenPayloadDto } from '@src/api/apps/auth/dtos/token-payload.dto';
import { UserTokenEntity } from '@src/api/apps/auth/entities/token.entity';

export interface ITokenService {
  generateToken(payload: TokenPayloadDto): string;
  findOneByUserId(userId: number): Promise<UserTokenEntity | null>;
  saveTokens(saveUserToken: SaveUserTokenDto): Promise<void>;
  deleteTokens(userId: number): Promise<void>;
}
