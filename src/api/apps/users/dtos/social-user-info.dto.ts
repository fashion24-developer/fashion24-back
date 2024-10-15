import { OmitType } from '@nestjs/mapped-types';

import { UserInfoDto } from '@src/api/apps/users/dtos/user-info.dto';

export class SocialUserInfoDto extends OmitType(UserInfoDto, [
  'rank',
  'point',
  'role',
  'createdAt',
  'updatedAt'
]) {}
