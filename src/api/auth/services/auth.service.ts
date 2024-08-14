import { UserProvider } from '@src/api/users/enums/user-provider.enum';

import { IAuthService } from './i-auth-service.interface';

export class AuthService implements IAuthService {
  constructor() {}

  login(provider: UserProvider, authorizeCode: string) {}
}
