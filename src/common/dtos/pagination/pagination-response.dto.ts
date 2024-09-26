import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDto } from '@src/common/dtos/pagination/pagination-meta.dto';

@ApiExtraModels()
export class PaginationResponseDto<T> {
  @ApiProperty({
    type: 'array'
  })
  data: Array<T>;

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;

  constructor(data: Array<T>, meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
