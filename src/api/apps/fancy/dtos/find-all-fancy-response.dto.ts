import { ApiProperty } from '@nestjs/swagger';

import { FancyProductStatus } from '@src/api/apps/fancy/enums/fancy-product-status.enum';
import { ValueOf } from '@src/common/types/common.type';
import { LookDto } from '@src/libs/looks/dtos/look.dto';

export class FindAllFancyResponseDto {
  @ApiProperty({ description: 'ID', example: '90c7gRlwkLvmDQxbp5pzY' })
  id: string;

  @ApiProperty({ description: '상품명', example: '고품질 반지' })
  name: string;

  @ApiProperty({ description: '원가', example: 10000 })
  price: number;

  @ApiProperty({ description: '판매가', example: 7000 })
  costPrice: number;

  @ApiProperty({ description: '할인율', example: 30 })
  discountRate: number;

  @ApiProperty({ description: '판매 상태', example: 'ACTIVE', enum: FancyProductStatus })
  status: ValueOf<typeof FancyProductStatus>;

  @ApiProperty({ description: '룩', type: [LookDto] })
  fancyLook: LookDto;
}
