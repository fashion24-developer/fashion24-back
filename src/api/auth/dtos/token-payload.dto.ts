import { TokenSubEnum } from '@src/api/auth/enums/token-sub.enum';

export class TokenPayloadDto {
  sub: TokenSubEnum;
  userId: number;
}
