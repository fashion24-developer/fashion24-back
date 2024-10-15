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

import { UserGender } from '@src/api/apps/users/enums/user-gender.enum';
import { UserProvider } from '@src/api/apps/users/enums/user-provider.enum';
import { UserRole } from '@src/api/apps/users/enums/user-role.enum';
import { ValueOf } from '@src/common/types/common.type';

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

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('KR')
  phone?: string;

  @IsNotEmpty()
  @IsEnum(UserProvider)
  provider: ValueOf<typeof UserProvider>;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: ValueOf<typeof UserRole> = UserRole.USER;

  @IsNotEmpty()
  @IsNumber()
  rank: number = 1;

  @IsNotEmpty()
  @IsNumber()
  point: number = 0;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: ValueOf<typeof UserGender> = UserGender.UNKNOWN;

  @IsOptional()
  @IsDateString()
  birth?: Date;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}
