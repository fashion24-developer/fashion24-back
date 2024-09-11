import { SaveUserTokenDto } from '@src/api/auth/dtos/save-user-token.dto';
import { TokenPayloadDto } from '@src/api/auth/dtos/token-payload.dto';

export interface ITokenService {
  generateToken(payload: TokenPayloadDto): string;
  saveTokens(saveUserToken: SaveUserTokenDto): void;
  deleteTokens(userId: number): Promise<void>;
}
