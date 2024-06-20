import {
  Controller,
  Delete,
  Get,
  MethodNotAllowedException,
  Patch,
  Post,
} from '@nestjs/common';

import { UsersService } from '@src/api/users/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @Get()
  findAll() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @Get(':id')
  findOne() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @Patch(':id')
  update() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @Delete(':id')
  remove() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
