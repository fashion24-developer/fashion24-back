import { User } from '@prisma/client';

import { IService } from '@src/common/interfaces/i-service.interface';

import { CreateUserDto } from '../dtos/create-user.dto';

export interface IUserService extends IService {
  create(userData: CreateUserDto): Promise<User>;
}
