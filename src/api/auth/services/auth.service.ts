import { HttpException, HttpStatus, Inject } from '@nestjs/common';

import { User } from '@prisma/client';
import axios from 'axios';

import { createAuthProviderConfig } from '@src/api/auth/auth-provider-config';
import { ServiceTokenDto } from '@src/api/auth/dtos/service-token.dto';
import { SocialTokenDto } from '@src/api/auth/dtos/social-token.dto';
import { TokenSubEnum } from '@src/api/auth/enums/token-sub.enum';
import { IAuthService } from '@src/api/auth/services/i-auth-service.interface';
import { ITokenService } from '@src/api/auth/services/i-token-service.interface';
import { TokenService } from '@src/api/auth/services/token.service';
import { SocialUserInfoDto } from '@src/api/users/dtos/social-user-info.dto';
import { UserProvider } from '@src/api/users/enums/user-provider.enum';
import { IUsersService } from '@src/api/users/services/i-users-service.interface';
import { UsersService } from '@src/api/users/services/users.service';

export class AuthService implements IAuthService {
  private readonly authProviderConfig;

  constructor(
    @Inject(UsersService) private readonly usersService: IUsersService,
    @Inject(TokenService) private readonly tokenService: ITokenService
  ) {
    this.authProviderConfig = createAuthProviderConfig();
  }

  async login(provider: UserProvider, authorizeCode: string): Promise<ServiceTokenDto> {
    try {
      const socialTokens = await this.getSocialTokens(provider, authorizeCode);
      const socialUserInfo = await this.getSocialUserInfo(provider, socialTokens);
      const findOneUser = await this.usersService.findOne({
        where: { uniqueId: socialUserInfo.uniqueId }
      });
      let user: User;

      if (findOneUser) {
        user = await this.usersService.update({
          where: { uniqueId: findOneUser.uniqueId },
          data: socialUserInfo
        });
      } else {
        user = await this.usersService.create(socialUserInfo);
      }

      // 서비스 토큰 발급
      const accessToken = this.tokenService.generateToken({
        sub: TokenSubEnum.ACCESS_TOKEN,
        userId: user.id,
        userRole: user.role
      });
      const refreshToken = this.tokenService.generateToken({
        sub: TokenSubEnum.REFRESH_TOKEN,
        userId: user.id,
        userRole: user.role
      });

      // 토큰 저장
      this.tokenService.saveTokens({
        userId: user.id,
        accessToken,
        refreshToken,
        socialAccessToken: socialTokens.accessToken,
        socialRefreshToken: socialTokens.refreshToken
      });

      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to login', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  async generateNewAccessToken(userId: number): Promise<ServiceTokenDto> {
    try {
      const user = await this.usersService.findOne({ where: { id: userId } });
      const accessToken = this.tokenService.generateToken({
        sub: TokenSubEnum.ACCESS_TOKEN,
        userId,
        userRole: user.role
      });

      return { accessToken };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to generate new access token',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error
        }
      );
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
