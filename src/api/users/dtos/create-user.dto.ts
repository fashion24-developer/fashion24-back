import { OmitType } from '@nestjs/mapped-types';

import { UserInfoDto } from './user-info.dto';

export class CreateUserDto extends OmitType(UserInfoDto, ['createdAt', 'updatedAt', 'deletedAt']) {}
