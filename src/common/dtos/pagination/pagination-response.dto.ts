import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { FindAllFancyResponseDto } from '@src/api/apps/fancy/dtos/find-all-fancy-response.dto';
import { PaginationMetaDto } from '@src/common/dtos/pagination/pagination-meta.dto';

@ApiExtraModels()
export class PaginationResponseDto<T> {
  // T에 들어갈 수 있는 DTO같은것들 oneOf 배열안에 묶어서 넣어주면 문서화 됩니다.
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [{ $ref: getSchemaPath(FindAllFancyResponseDto) }]
    }
  })
  data: Array<T>;

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;

  constructor(data: Array<T>, meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
