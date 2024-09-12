import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString
} from 'class-validator';

import { UserProvider } from '@src/api/users/enums/user-provider.enum';
import { UserRole } from '@src/api/users/enums/user-role.enum';

export class UserInfoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  uniqueId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('KR')
  phone?: string;

  @IsNotEmpty()
  @IsEnum(UserProvider)
  provider: UserProvider;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;

  @IsNotEmpty()
  @IsNumber()
  rank: number = 1;

  @IsNotEmpty()
  @IsNumber()
  point: number = 0;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;

  @IsDateString()
  deletedAt?: Date;
}
