import { IService } from '@src/common/interfaces/i-service';

export class IUserService extends IService {
  isOwner: () => Promise<boolean>;
}
