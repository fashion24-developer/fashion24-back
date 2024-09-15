import { ServiceTokenDto } from '@src/api/auth/dtos/service-token.dto';
import { UserProvider } from '@src/api/users/enums/user-provider.enum';
import { ResponseDto } from '@src/common/dtos/response.dto';

export interface IAuthService {
  login(provider: UserProvider, authorizeCode: string): Promise<ServiceTokenDto>;
  logout(provider: UserProvider, userId: number): Promise<ResponseDto>;
  generateNewAccessToken(userId: number): Promise<ServiceTokenDto>;
}
