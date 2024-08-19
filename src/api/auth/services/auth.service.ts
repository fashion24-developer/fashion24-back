import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import axios from 'axios';

import { UserProvider } from '@src/api/users/enums/user-provider.enum';
import { IUsersService } from '@src/api/users/services/i-users-service.interface';
import { UsersService } from '@src/api/users/services/users.service';

import { createAuthProviderConfig } from '../auth-provider-config';
import { SocialTokenDto } from '../dtos/social-token.dto';
import { SocialUserInfoDto } from './../../users/dtos/social-user-info.dto';
import { IAuthService } from './i-auth-service.interface';

export class AuthService implements IAuthService {
  private readonly authProviderConfig;

  constructor(
    @Inject(UsersService)
    private readonly usersService: IUsersService
  ) {
    this.authProviderConfig = createAuthProviderConfig();
  }

  /**
   * 로그인 서비스 작동 방식
   * 1. authorizeCode로 social token 발급 (完)
   * 2. social token으로 사용자 정보 요청 (完)
   * 3. 사용자 정보 저장 (完)
   * 4. 서비스 토큰 발급
   * 5. 서비스 토큰 반환
   */
  async login(provider: UserProvider, authorizeCode: string) {
    try {
      const socialTokens = await this.getSocialTokens(provider, authorizeCode);
      const socialUserInfo = await this.getSocialUserInfo(provider, socialTokens);
      const createUser = await this.usersService.create(socialUserInfo);

      return createUser;
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to login', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  private async getSocialTokens(
    provider: UserProvider,
    authorizeCode: string
  ): Promise<SocialTokenDto> {
    try {
      const providerConfig = this.authProviderConfig[provider];

      const tokenUrl = providerConfig.tokenUrl;
      const tokenHeader = providerConfig.tokenHeader;
      const tokenBody = providerConfig.tokenBody(authorizeCode);

      const socialTokens = (
        await axios.post(tokenUrl, tokenBody, {
          headers: tokenHeader
        })
      ).data;

      return { accessToken: socialTokens.access_token, refreshToken: socialTokens.refresh_token };
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to get social tokens', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  private async getSocialUserInfo(
    provider: UserProvider,
    socialTokens: SocialTokenDto
  ): Promise<SocialUserInfoDto> {
    try {
      const providerConfig = this.authProviderConfig[provider];

      const userInfoUrl = providerConfig.userInfoUrl;
      const userInfoHeader = providerConfig.userInfoHeader(socialTokens.accessToken);

      const userInfoResponse = (
        await axios.get(userInfoUrl, {
          headers: userInfoHeader
        })
      ).data;

      return providerConfig.extractUserInfo(userInfoResponse);
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to get social user info', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }
}
