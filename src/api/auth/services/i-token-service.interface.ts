import { TokenPayloadDto } from '@src/api/auth/dtos/token-payload.dto';
import { UserTokenSaveDto } from '@src/api/auth/dtos/user-token-save.dto';

export interface ITokenService {
  generateToken(payload: TokenPayloadDto): string;
  saveTokens(userTokenSave: UserTokenSaveDto): void;
}
