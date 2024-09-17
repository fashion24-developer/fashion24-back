import { ServiceTokenDto } from '@src/api/auth/dtos/service-token.dto';
import { UserProvider } from '@src/api/users/enums/user-provider.enum';
import { ResponseDto } from '@src/common/dtos/response.dto';
import { ValueOf } from '@src/common/types/common.type';

export interface IAuthService {
  login(provider: ValueOf<typeof UserProvider>, authorizeCode: string): Promise<ServiceTokenDto>;
  logout(provider: ValueOf<typeof UserProvider>, userId: number): Promise<ResponseDto>;
  generateNewAccessToken(userId: number): Promise<ServiceTokenDto>;
}
