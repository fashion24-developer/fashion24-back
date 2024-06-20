import { Injectable } from '@nestjs/common';

import { IRepository } from '@src/common/interfaces/i-repository.interface';

@Injectable()
export class UsersRepository implements IRepository {}
