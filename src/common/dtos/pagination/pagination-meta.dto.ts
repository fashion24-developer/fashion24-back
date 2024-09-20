import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({ description: '현재 페이지 번호' })
  pageNumber: number;

  @ApiProperty({ description: '페이지 사이즈' })
  pageSize: number;

  @ApiProperty({ description: '전체 페이지 수' })
  totalPages: number;

  @ApiProperty({ description: '전체 자료 수' })
  totalCount: number;

  @ApiProperty({ description: '현재 페이지 마지막 여부' })
  isLastPage: boolean;

  @ApiProperty({ description: '현재 페이지 첫번째 여부' })
  isFirstPage: boolean;
}
