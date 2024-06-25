import {
  Controller,
  Delete,
  Get,
  MethodNotAllowedException,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiUsers } from '@src/api/users/controllers/users.swagger';
import { UsersService } from '@src/api/users/services/users.service';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiUsers.Create({ summary: '유저 생성 API' })
  @Post()
  create() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiUsers.FindAll({ summary: '유저 전체 조회 API' })
  @Get()
  findAll() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiUsers.FindOne({ summary: '유저 단일 조회 API' })
  @Get(':id')
  findOne() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiUsers.Update({ summary: '유저 PATCH 수정 API' })
  @Patch(':id')
  update() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiUsers.Remove({ summary: '유저 삭제 API' })
  @Delete(':id')
  remove() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
