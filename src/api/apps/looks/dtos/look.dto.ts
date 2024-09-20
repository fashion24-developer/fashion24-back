import { ApiProperty } from '@nestjs/swagger';

export class LookDto {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: 'Look 이름' })
  name: string;

  @ApiProperty({ description: 'Look 이미지 URL' })
  imageUrl: string;

  @ApiProperty({ description: '생성일' })
  createdAt: Date;
}
