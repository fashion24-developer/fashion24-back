import { ConfigService } from '@nestjs/config';

import { UserProvider } from '@src/api/apps/users/enums/user-provider.enum';
import { ENV_KEY } from '@src/libs/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/libs/core/app-config/services/app-config.service';

export function createAuthProviderConfig() {
  const configService = new ConfigService();
  const appConfigService = new AppConfigService(configService);

  return {
    [UserProvider.NAVER]: {
      tokenUrl: 'https://nid.naver.com/oauth2.0/token',
      tokenHeader: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      tokenBody: (authorizeCode: string) => ({
        grant_type: 'authorization_code',
        client_id: appConfigService.get<string>(ENV_KEY.NAVER_CLIENT_ID),
        client_secret: appConfigService.get<string>(ENV_KEY.NAVER_CLIENT_SECRET),
        code: authorizeCode,
        redirect_uri: appConfigService.get<string>(ENV_KEY.NAVER_REDIRECT_URI),
        state: 'test'
      }),
      userInfoUrl: 'https://openapi.naver.com/v1/nid/me',
      userInfoHeader: (socialAccessToken: string) => ({
        Authorization: `Bearer ${socialAccessToken}`
      }),
      extractUserInfo: (userInfoResponse: any) => ({
        uniqueId: userInfoResponse.response.id,
        name: userInfoResponse.response.name,
        email: userInfoResponse.response.email,
        phone: userInfoResponse.response.mobile,
        provider: UserProvider.NAVER
      })
    },
    [UserProvider.KAKAO]: {
      tokenUrl: 'https://kauth.kakao.com/oauth/token',
      tokenHeader: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      tokenBody: (authorizeCode: string) => ({
        grant_type: 'authorization_code',
        client_id: appConfigService.get<string>(ENV_KEY.KAKAO_CLIENT_ID),
        redirect_uri: appConfigService.get<string>(ENV_KEY.KAKAO_REDIRECT_URI),
        code: authorizeCode
      }),
      userInfoUrl: 'https://kapi.kakao.com/v2/user/me',
      userInfoHeader: (socialAccessToken: string) => ({
        Authorization: `Bearer ${socialAccessToken}`
      }),
      extractUserInfo: (userInfoResponse: any) => ({
        uniqueId: String(userInfoResponse.id),
        name: userInfoResponse.kakao_account.name,
        email: userInfoResponse.kakao_account.email,
        phone: userInfoResponse.kakao_account.phone_number,
        provider: UserProvider.KAKAO
      }),
      logoutUrl: 'https://kapi.kakao.com/v1/user/logout',
      logoutHeader: (socialAccessToken: string) => ({
        Authorization: `Bearer ${socialAccessToken}`
      })
    },
    [UserProvider.GOOGLE]: {
      tokenUrl: 'https://oauth2.googleapis.com/token',
      tokenHeader: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      tokenBody: (authorizeCode: string) => ({
        grant_type: 'authorization_code',
        client_id: appConfigService.get<string>(ENV_KEY.GOOGLE_CLIENT_ID),
        client_secret: appConfigService.get<string>(ENV_KEY.GOOGLE_CLIENT_SECRET),
        code: authorizeCode,
        redirect_uri: appConfigService.get<string>(ENV_KEY.GOOGLE_REDIRECT_URI)
      }),
      userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
      userInfoHeader: (socialAccessToken: string) => ({
        Authorization: `Bearer ${socialAccessToken}`
      }),
      extractUserInfo: (userInfoResponse: any) => ({
        uniqueId: userInfoResponse.id,
        email: userInfoResponse.email,
        provider: UserProvider.GOOGLE
      })
    }
  };
}
