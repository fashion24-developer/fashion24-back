import { UserProvider } from '@src/api/users/enums/user-provider.enum';

import { ServiceTokenDto } from '../dtos/service-token.dto';

export interface IAuthService {
  login(authorizeCode: string, provider: UserProvider): Promise<ServiceTokenDto>;
}
