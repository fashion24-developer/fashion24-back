import { UserEntity } from '@src/api/users/entities/user.entity';
import { IService } from '@src/common/interfaces/i-service.interface';

export interface IUsersService extends IService<UserEntity> {
  create(userData: UserEntity): Promise<UserEntity>;
  findOneById(id: number): Promise<UserEntity | null>;
  findOneByUniqueId(uniqueId: string): Promise<UserEntity | null>;
  update(data: UserEntity): Promise<UserEntity>;
}
