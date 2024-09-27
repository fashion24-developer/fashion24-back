import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number;

  @ApiProperty({ description: '태그 이름', example: '여름' })
  name: string;

  @ApiPropertyOptional({ description: '생성일', example: '2024-09-05T12:15:54.194Z' })
  createdAt: Date;
}
