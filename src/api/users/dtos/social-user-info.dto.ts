import { OmitType } from '@nestjs/mapped-types';

import { UserInfoDto } from './user-info.dto';

export class SocialUserInfoDto extends OmitType(UserInfoDto, [
  'rank',
  'point',
  'provider',
  'role',
  'createdAt',
  'updatedAt',
  'deletedAt'
]) {}
