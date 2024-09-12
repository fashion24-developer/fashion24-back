import { ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ description: '페이지 번호', default: 1 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number = 1;

  @ApiPropertyOptional({ description: '조회할 데이터 수, 값이 없으면 전체 조회' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  pageSize?: number;
}
