import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdminGuard } from '@src/api/apps/auth/jwt/jwt-auth.guard';
import { routesV1 } from '@src/configs/app.route';

@ApiTags('admin look')
// @UseGuards(AdminGuard)
@Controller(routesV1.version)
export class LookAdminController {
  constructor() {}

  @Post('admin' + routesV1.look.create)
  asdf() {
    return 'asdf';
  }
}
