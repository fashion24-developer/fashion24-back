import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FancyImageDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number;

  @ApiProperty({ description: '팬시 ID', example: '90c7gRlwkLvmDQxbp5pzY' })
  fancyId: string;

  @ApiProperty({ description: '이미지 URL', example: 'https://fashion24.com/1.jpg' })
  imageUrl: string;

  @ApiProperty({ description: '순서', example: 1 })
  order: number;

  @ApiPropertyOptional({ description: '생성일', example: '2024-09-11T20:14:50.075Z' })
  createdAt: Date;
}
