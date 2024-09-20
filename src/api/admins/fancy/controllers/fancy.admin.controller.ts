import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiFancy } from '@src/api/admins/fancy/controllers/fancy.swagger';
import { CreateFancyInputDto } from '@src/api/admins/fancy/dtos/create-fancy-input.dto';
import { CreateFancyResponseDto } from '@src/api/admins/fancy/dtos/create-fancy-response.dto';
import { FancyAdminService } from '@src/api/admins/fancy/services/fancy.admin.service';
import { AdminGuard } from '@src/api/apps/auth/jwt/jwt-auth.guard';
import { routesV1 } from '@src/configs/app.route';

@ApiTags('admin fancy')
@UseGuards(AdminGuard)
@Controller(routesV1.version)
export class FancyAdminController {
  constructor(private readonly fancyAdminService: FancyAdminService) {}

  @ApiFancy.Create({ summary: 'fancy 생성' })
  @Post('admin' + routesV1.fancy.create)
  async create(@Body() fancyInfo: CreateFancyInputDto): Promise<CreateFancyResponseDto> {
    return new CreateFancyResponseDto(await this.fancyAdminService.create(fancyInfo));
  }
}
