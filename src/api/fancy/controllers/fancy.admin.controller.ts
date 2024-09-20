import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdminGuard } from '@src/api/auth/jwt/jwt-auth.guard';
import { ApiFancy } from '@src/api/fancy/controllers/fancy.swagger';
import { CreateFancyInputDto } from '@src/api/fancy/dtos/create-fancy-input.dto';
import { CreateFancyResponseDto } from '@src/api/fancy/dtos/create-fancy-response.dto';
import { FancyService } from '@src/api/fancy/services/fancy.service';
import { routesV1 } from '@src/configs/app.route';

@ApiTags('admin fancy')
@UseGuards(AdminGuard)
@Controller(routesV1.version)
export class FancyAdminController {
  constructor(private readonly fancyService: FancyService) {}

  @ApiFancy.Create({ summary: 'fancy 생성' })
  @Post('admin' + routesV1.fancy.create)
  async create(@Body() fancyInfo: CreateFancyInputDto): Promise<CreateFancyResponseDto> {
    return new CreateFancyResponseDto(await this.fancyService.create(fancyInfo));
  }
}
