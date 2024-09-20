import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccessTokenAuthGuard } from '@src/api/auth/jwt/jwt-auth.guard';
import { ApiLook } from '@src/api/looks/controllers/look.swagger';
import { LookResponseDto } from '@src/api/looks/dtos/look-response.dto';
import { LookService } from '@src/api/looks/services/look.service';
import { globalPrefix } from '@src/bootstrap.service';
import { routesV1 } from '@src/configs/app.route';

@UseGuards(AccessTokenAuthGuard)
@ApiTags('look')
@Controller(routesV1.version)
export class LookController {
  static path = `${globalPrefix}` + `${routesV1.version}` + `${routesV1.look.root}`;

  constructor(private readonly lookService: LookService) {}

  @ApiLook.FindAll({ summary: '룩 전체 조회' })
  @Get(routesV1.look.findAll)
  async findAll(): Promise<LookResponseDto[]> {
    const look = await this.lookService.findAll();

    return look.map((item) => new LookResponseDto(item));
  }
}
