import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LookDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Look 이름', example: '룩 1번' })
  name: string;

  @ApiProperty({ description: 'Look 이미지 URL', example: 'https://fashion24.com/1.jpg' })
  imageUrl: string;

  @ApiPropertyOptional({ description: '생성일', example: '2024-09-11T20:14:50.075Z' })
  createdAt: Date;
}
