import { OmitType } from '@nestjs/swagger';

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserProvider } from '../enums/user-provider.enum';
import { UserRole } from '../enums/user-role.enum';
import { UserInfoDto } from './user-info.dto';

// export class CreateUserDto {
//   @IsNotEmpty()
//   @IsString()
//   uniqueId: string;

//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @IsNotEmpty()
//   @IsString()
//   nickname: string;

//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   @IsOptional()
//   phone?: string;

//   @IsNotEmpty()
//   @IsEnum(UserProvider)
//   provider: UserProvider;

//   @IsNotEmpty()
//   @IsEnum(UserRole)
//   role: UserRole = UserRole.USER;
// }
export class CreateUserDto extends OmitType(UserInfoDto, ['createdAt', 'updatedAt', 'deletedAt']) {}
