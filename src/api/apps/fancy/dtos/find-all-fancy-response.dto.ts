import { ApiProperty } from '@nestjs/swagger';

import { FancyProductStatus } from '@src/api/apps/fancy/enums/fancy-product-status.enum';
import { ValueOf } from '@src/common/types/common.type';
import { FancyImageDto } from '@src/libs/fancy/fancy-images/dtos/fancy-image.dto';
import { LookDto } from '@src/libs/looks/dtos/look.dto';
import { TagDto } from '@src/libs/tags/dtos/tag.dto';

class SubOptionDto {
  @ApiProperty({ description: '서브옵션 ID', example: 2 })
  id: number;

  @ApiProperty({ description: '옵션 ID', example: 1 })
  optionId: number;

  @ApiProperty({ description: '서브옵션명', example: '네모' })
  name: string;

  @ApiProperty({ description: '추가금액', example: 100 })
  additionalPrice: number;
}

class FancyOptionDto {
  @ApiProperty({ description: '옵션 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '옵션명', example: '모양' })
  name: string;

  @ApiProperty({ description: '서브옵션', type: [SubOptionDto] })
  subOptions: SubOptionDto[];
}

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

  @ApiProperty({ description: '이미지', type: [FancyImageDto] })
  fancyImages: FancyImageDto[];

  @ApiProperty({ description: '옵션', type: [FancyOptionDto] })
  fancyOptions: FancyOptionDto[];

  @ApiProperty({ description: '룩', type: [LookDto] })
  looks: LookDto[];

  @ApiProperty({ description: '태그', type: [TagDto] })
  tags: TagDto[];
}
