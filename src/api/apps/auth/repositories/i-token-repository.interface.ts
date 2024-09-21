import { UserTokenEntity } from '@src/api/apps/auth/entities/token.entity';
import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface ITokenRepository extends IRepository<UserTokenEntity> {
  create(data: any): Promise<UserTokenEntity>;
  findOneByUserId(userId: number): Promise<UserTokenEntity | null>;
  deleteByUserId(userId: number): Promise<UserTokenEntity>;
}
