import { ApiProperty } from '@nestjs/swagger';

import { FindAllFancyResponseDto } from '@src/api/apps/fancy/dtos/find-all-fancy-response.dto';
import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';

export class FancyPaginationResponseDto extends PaginationResponseDto<FindAllFancyResponseDto> {
  @ApiProperty({ type: [FindAllFancyResponseDto] })
  data: FindAllFancyResponseDto[];
}
