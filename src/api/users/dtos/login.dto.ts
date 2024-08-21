import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserProvider } from '@src/api/users/enums/user-provider.enum';

export class LoginParamDto {
  @IsEnum(UserProvider)
  provider: UserProvider;
}

export class LoginQueryDto {
  @IsString()
  @IsNotEmpty()
  authorizeCode: string;
}
