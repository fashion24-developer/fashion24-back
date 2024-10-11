import { OmitType } from '@nestjs/mapped-types';

import { UserInfoDto } from '@src/api/apps/users/dtos/user-info.dto';

export class CreateUserDto extends OmitType(UserInfoDto, ['createdAt', 'updatedAt']) {}
