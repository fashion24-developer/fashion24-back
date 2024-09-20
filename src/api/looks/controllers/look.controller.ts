import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { globalPrefix } from '@src/bootstrap.service';
import { routesV1 } from '@src/configs/app.route';

@ApiTags('Look')
@Controller('look')
export class LookController {
  static path = `${globalPrefix}` + `${routesV1.version}` + `${routesV1.look.root}`;

  constructor() {}

  @Get(routesV1.look.findAll)
  findAll() {
    return;
  }
}
