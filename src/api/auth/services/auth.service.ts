import axios from 'axios';

import { UserProvider } from '@src/api/users/enums/user-provider.enum';

import { createAuthProviderConfig } from '../auth-provider-config';
import { SocialTokenDto } from '../dtos/social-token.dto';
import { IAuthService } from './i-auth-service.interface';

export class AuthService implements IAuthService {
  private readonly authProviderConfig;

  constructor() {
    this.authProviderConfig = createAuthProviderConfig();
  }

  /**
   * 로그인 서비스 작동 방식
   * 1. authorizeCode로 social token 발급
   * 2. social token으로 사용자 정보 요청
   * 3. 사용자 정보 저장
   * 4. 사용자 정보 반환
   */
  async login(provider: UserProvider, authorizeCode: string) {
    const socialTokens = await this.getSocialToken(provider, authorizeCode);

    const userInfoResponse = await this.getSocialUserInfo(provider, socialTokens);

    console.log(userInfoResponse);
  }

  async getSocialToken(provider: UserProvider, authorizeCode: string): Promise<SocialTokenDto> {
    const providerConfig = this.authProviderConfig[provider];

    const tokenUrl = providerConfig.tokenUrl;
    const tokenHeader = providerConfig.tokenHeader;
    const tokenBody = providerConfig.tokenBody(authorizeCode);

    const tokenResponse = (
      await axios.post(tokenUrl, tokenBody, {
        headers: tokenHeader
      })
    ).data;

    return tokenResponse;
  }

  async getSocialUserInfo(provider: UserProvider, socialTokens: SocialTokenDto) {
    const providerConfig = this.authProviderConfig[provider];

    const userInfoUrl = providerConfig.userInfoUrl;
    const userInfoHeader = providerConfig.userInfoHeader(socialTokens.accessToken);

    const userInfoResponse = (
      await axios.get(userInfoUrl, {
        headers: userInfoHeader
      })
    ).data;

    return userInfoResponse;
  }
}
