import { IsEnum } from 'class-validator';

import { UserProvider } from '@src/api/users/enums/user-provider.enum';
import { ValueOf } from '@src/common/types/common.type';

export class AuthParamDto {
  @IsEnum(UserProvider)
  provider: ValueOf<typeof UserProvider>;
}
