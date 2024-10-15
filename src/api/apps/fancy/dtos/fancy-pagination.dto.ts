import { ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { ArrayMaxSize, IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

import { TransformValueToNumberArray } from '@src/api/apps/fancy/decorators/value-to-number-array.decorator';
import { FancyOrderBy } from '@src/api/apps/fancy/enums/fancy-orderby.enum';
import '@src/api/apps/fancy/enums/fancy-product-status.enum';
import { FancyProductStatus } from '@src/api/apps/fancy/enums/fancy-product-status.enum';
import { PaginationDto } from '@src/common/dtos/pagination/pagination.dto';
import { SortOption } from '@src/common/enums/sort-option.enum';
import { ValueOf } from '@src/common/types/common.type';

export class FancyPaginationDto extends PaginationDto {
  @ApiPropertyOptional({ description: '룩 ID' })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  fancyLookId?: number;

  @ApiPropertyOptional({ description: '타입 ID' })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  fancyTypeId?: number;

  @ApiPropertyOptional({ description: '태그 ID', maxItems: 3, type: [Number] })
  @TransformValueToNumberArray()
  @IsInt({ each: true })
  @ArrayMaxSize(3)
  @IsOptional()
  fancyTagId?: number[];

  @ApiPropertyOptional({ description: '완제품 이름', maxLength: 50 })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: '상품 상태', enum: FancyProductStatus })
  @IsEnum(FancyProductStatus)
  @IsOptional()
  status?: ValueOf<typeof FancyProductStatus>;

  @ApiPropertyOptional({
    description: '정렬 기준',
    enum: FancyOrderBy,
    default: FancyOrderBy.PRICE
  })
  @IsEnum(FancyOrderBy)
  orderBy: ValueOf<typeof FancyOrderBy> = FancyOrderBy.PRICE;

  @ApiPropertyOptional({
    description: '정렬 방향',
    enum: SortOption,
    default: SortOption.DESC
  })
  @IsEnum(SortOption)
  orderDirection: ValueOf<typeof SortOption> = SortOption.DESC;
}
