import { ServiceTokenDto } from '@src/api/auth/dtos/service-token.dto';
import { UserProvider } from '@src/api/users/enums/user-provider.enum';

export interface IAuthService {
  login(authorizeCode: string, provider: UserProvider): Promise<ServiceTokenDto>;
}
