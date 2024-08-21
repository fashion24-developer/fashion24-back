import { IsEnum } from 'class-validator';

import { UserProvider } from '@src/api/users/enums/user-provider.enum';

export class LoginParamDto {
  @IsEnum(UserProvider)
  provider: UserProvider;
}
