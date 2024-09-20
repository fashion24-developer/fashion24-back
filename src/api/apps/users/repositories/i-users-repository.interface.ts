import { UserEntity } from '@src/api/apps/users/entities/user.entity';
import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface IUsersRepository extends IRepository<UserEntity> {
  create(data: UserEntity): Promise<UserEntity>;
  findOneByUniqueId(uniqueId: string): Promise<UserEntity | null>;
  update(data: UserEntity): Promise<UserEntity>;
}
