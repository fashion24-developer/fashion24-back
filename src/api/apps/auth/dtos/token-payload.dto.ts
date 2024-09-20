import { TokenSubEnum } from '@src/api/apps/auth/enums/token-sub.enum';

export class TokenPayloadDto {
  sub: TokenSubEnum;
  userId: number;
  userRole: string;
}
