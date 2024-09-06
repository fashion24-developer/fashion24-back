import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ProductStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class FancyDto {
  @ApiProperty({ description: '아이디', example: '90c7gRlwkLvmDQxbp5pzY' })
  @IsString()
  id: string;

  @ApiProperty({ description: '이름', example: 'finger ring' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '원가', example: 25000 })
  @IsNumber()
  @Min(0)
  costPrice: number;

  @ApiProperty({ description: '가격', example: 24250 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: '할인율', example: 3 })
  @IsNumber()
  @Min(0)
  discountRate: number;

  @ApiProperty({ description: '설명1', example: '예쁘고 미니멀한 반지' })
  @IsString()
  @ApiPropertyOptional()
  description1: string;

  @ApiProperty({ description: '설명2', example: '이 반지는 예쁘고 미니멀한 반자입니다.' })
  @IsString()
  @ApiPropertyOptional()
  description2: string;

  @ApiProperty({ description: '상태', example: 'ACTIVE' })
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty({ description: '생성일', example: '2024-09-05T12:15:54.194Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: '수정일', example: '2024-09-05T12:15:54.194Z' })
  @IsDate()
  updatedAt: Date;
}
