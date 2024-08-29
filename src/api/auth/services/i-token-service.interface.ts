import { SaveUserTokenDto } from '@src/api/auth/dtos/save-user-token.dto';
import { ServiceTokenDto } from '@src/api/auth/dtos/service-token.dto';
import { TokenPayloadDto } from '@src/api/auth/dtos/token-payload.dto';

export interface ITokenService {
  generateToken(payload: TokenPayloadDto): string;
  saveTokens(saveUserToken: SaveUserTokenDto): void;
}
