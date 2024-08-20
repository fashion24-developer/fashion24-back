import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { UserTokenSaveDto } from '../dtos/user-token-save.dto';

export interface ITokenService {
  generateToken(payload: TokenPayloadDto): string;
  saveTokens(userTokenSave: UserTokenSaveDto): void;
}
