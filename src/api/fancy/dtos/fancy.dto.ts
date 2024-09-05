import { ProductStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class FancyDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  costPrice: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  discountRate: number;

  @IsString()
  description1: string;

  @IsString()
  description2: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
