import { TokenSubEnum } from '../enums/token-sub.enum';

export class TokenPayloadDto {
  sub: TokenSubEnum;
  userId: number;
}
