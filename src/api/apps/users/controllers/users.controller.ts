import {
  Controller,
  Delete,
  Get,
  Inject,
  MethodNotAllowedException,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiUsers } from '@src/api/apps/users/controllers/users.swagger';
import { UsersService } from '@src/api/apps/users/services/users.service';
import { globalPrefix } from '@src/bootstrap.service';
import { USERS_SERVICE_DI_TOKEN } from '@src/common/constants/di.tokens';
import { routesV1 } from '@src/configs/app.route';

@ApiTags('user')
@Controller(routesV1.version)
export class UsersController {
  static path = `/${globalPrefix}/${routesV1.version}/${routesV1.user.root}`;

  constructor(@Inject(USERS_SERVICE_DI_TOKEN) private readonly usersService: UsersService) {}

  @ApiUsers.Create({ summary: '유저 생성 API' })
  @Post(routesV1.user.root)
  create() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiUsers.FindAll({ summary: '유저 전체 조회 API' })
  @Get(routesV1.user.root)
  findAll() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiUsers.FindOne({ summary: '유저 단일 조회 API' })
  @Get(routesV1.user.findOne)
  findOne() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiUsers.Update({ summary: '유저 PATCH 수정 API' })
  @Patch(routesV1.user.patch)
  update() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiUsers.Remove({ summary: '유저 삭제 API' })
  @Delete(routesV1.user.delete)
  remove() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
