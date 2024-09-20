import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccessTokenAuthGuard } from '@src/api/apps/auth/jwt/jwt-auth.guard';
import { ApiLookApp } from '@src/api/apps/looks/controllers/look.app.swagger';
import { LookAppService } from '@src/api/apps/looks/services/look.app.service';
import { globalPrefix } from '@src/bootstrap.service';
import { routesV1 } from '@src/configs/app.route';
import { LookResponseDto } from '@src/libs/looks/dtos/look-response.dto';

@UseGuards(AccessTokenAuthGuard)
@ApiTags('look')
@Controller(routesV1.version)
export class LookAppController {
  static path = `${globalPrefix}` + `${routesV1.version}` + `${routesV1.look.root}`;

  constructor(private readonly lookAppService: LookAppService) {}

  @ApiLookApp.FindAll({ summary: '룩 전체 조회' })
  @Get(routesV1.look.findAll)
  async findAll(): Promise<LookResponseDto[]> {
    const look = await this.lookAppService.findAll();

    return look.map((item) => new LookResponseDto(item));
  }
}
