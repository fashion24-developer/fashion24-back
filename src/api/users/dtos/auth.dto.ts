import { IsEnum } from 'class-validator';

import { UserProvider } from '@src/api/users/enums/user-provider.enum';

export class AuthParamDto {
  @IsEnum(UserProvider)
  provider: UserProvider;
}
