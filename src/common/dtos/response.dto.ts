import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({ description: '상태 코드', example: 200 })
  statusCode: number;

  @ApiProperty({ description: '메시지', example: '••• 성공' })
  message: string;
}
