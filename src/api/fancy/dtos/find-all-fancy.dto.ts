import { ApiPropertyOptional } from '@nestjs/swagger';

import { Prisma, ProductStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

import { TransformValueToNumberArray } from '@src/api/fancy/decorators/value-to-number-array.decorator';
import { FancyOrderBy } from '@src/api/fancy/enums/fancy-orderby.enum';
import { PaginationDto } from '@src/common/dtos/pagination/pagaination.dto';

export class FindAllFancyDto extends PaginationDto {
  @ApiPropertyOptional({ description: '완제품 이름' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: '상품 상태', enum: ProductStatus })
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @ApiPropertyOptional({ description: '옵션 ID' })
  @TransformValueToNumberArray()
  @IsInt({ each: true })
  @IsOptional()
  optionName?: number[];

  @ApiPropertyOptional({ description: '소옵션 ID' })
  @TransformValueToNumberArray()
  @IsInt({ each: true })
  @IsOptional()
  subOptionName?: number[];

  @ApiPropertyOptional({ description: '룩 ID' })
  @TransformValueToNumberArray()
  @IsInt({ each: true })
  @IsOptional()
  lookName?: number[];

  @ApiPropertyOptional({ description: '태그 ID' })
  @TransformValueToNumberArray()
  @IsInt({ each: true })
  @IsOptional()
  tagName?: number[];

  @ApiPropertyOptional({
    description: '정렬 기준',
    enum: FancyOrderBy,
    default: FancyOrderBy.PRICE
  })
  @IsEnum(FancyOrderBy)
  orderBy: FancyOrderBy = FancyOrderBy.PRICE;

  @ApiPropertyOptional({
    description: '정렬 방향',
    enum: Prisma.SortOrder,
    default: Prisma.SortOrder.desc
  })
  @IsEnum(Prisma.SortOrder)
  orderDirection: Prisma.SortOrder = Prisma.SortOrder.desc;
}
