import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';

import axios from 'axios';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { createAuthProviderConfig } from '@src/api/apps/auth/auth-provider-config';
import { ServiceTokenDto } from '@src/api/apps/auth/dtos/service-token.dto';
import { SocialTokenDto } from '@src/api/apps/auth/dtos/social-token.dto';
import { TokenSubEnum } from '@src/api/apps/auth/enums/token-sub.enum';
import { IAuthService } from '@src/api/apps/auth/services/i-auth-service.interface';
import { ITokenService } from '@src/api/apps/auth/services/i-token-service.interface';
import { SocialUserInfoDto } from '@src/api/apps/users/dtos/social-user-info.dto';
import { UserEntity } from '@src/api/apps/users/entities/user.entity';
import { UserProvider } from '@src/api/apps/users/enums/user-provider.enum';
import { IUsersService } from '@src/api/apps/users/services/i-users-service.interface';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common.constant';
import { TOKEN_SERVICE_DI_TOKEN, USERS_SERVICE_DI_TOKEN } from '@src/common/constants/di.tokens';
import { ResponseDto } from '@src/common/dtos/response.dto';
import { ValueOf } from '@src/common/types/common.type';

export class AuthService implements IAuthService {
  private readonly authProviderConfig;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(USERS_SERVICE_DI_TOKEN) private readonly usersService: IUsersService,
    @Inject(TOKEN_SERVICE_DI_TOKEN) private readonly tokenService: ITokenService
  ) {
    this.authProviderConfig = createAuthProviderConfig();
  }

  async login(
    provider: ValueOf<typeof UserProvider>,
    authorizeCode: string
  ): Promise<ServiceTokenDto> {
    try {
      const socialTokens = await this.getSocialTokens(provider, authorizeCode);
      const socialUserInfo = await this.getSocialUserInfo(provider, socialTokens);
      const findOneUser = await this.usersService.findOneByUniqueId(socialUserInfo.uniqueId);
      let user: UserEntity;

      if (findOneUser) {
        findOneUser.update(socialUserInfo);

        user = await this.usersService.update(findOneUser);
      } else {
        const entity = UserEntity.create(socialUserInfo);
        user = await this.usersService.create(entity);
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

      return new ServiceTokenDto({ accessToken, refreshToken });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to login',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[500]
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async logout(provider: ValueOf<typeof UserProvider>, userId: number): Promise<ResponseDto> {
    try {
      const userSocialTokens = await this.tokenService.findOneByUserId(userId);
      const socialTokens: SocialTokenDto = {
        accessToken: userSocialTokens.socialAccessToken,
        refreshToken: userSocialTokens.socialRefreshToken
      };

      if (provider === UserProvider.KAKAO) {
        await this.requestLogout(provider, socialTokens);
      }

      await this.tokenService.deleteTokens(userId);

      return { statusCode: HttpStatus.OK, message: 'Logout successful' };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to logout',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[500]
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async generateNewAccessToken(userId: number): Promise<ServiceTokenDto> {
    try {
      const user = await this.usersService.findOneById(userId);
      const accessToken = this.tokenService.generateToken({
        sub: TokenSubEnum.ACCESS_TOKEN,
        userId,
        userRole: user.role
      });

      return new ServiceTokenDto({ accessToken });
    } catch (error) {
      this.logger.error(error);
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
    provider: ValueOf<typeof UserProvider>,
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

      return new ServiceTokenDto({
        accessToken: socialTokens.access_token,
        refreshToken: socialTokens.refresh_token
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Failed to get social tokens', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  private async getSocialUserInfo(
    provider: ValueOf<typeof UserProvider>,
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
      this.logger.error(error);
      throw new HttpException('Failed to get social user info', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  private async requestLogout(
    provider: ValueOf<typeof UserProvider>,
    socialTokens: SocialTokenDto
  ): Promise<void> {
    try {
      const providerConfig = this.authProviderConfig[provider];

      const logoutUrl = providerConfig.logoutUrl;
      const logoutHeader = providerConfig.logoutHeader(socialTokens.accessToken);

      await axios.post(logoutUrl, {}, { headers: logoutHeader });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Failed to request logout', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }
}
