import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';

import { UserProvider } from '../users/enums/user-provider.enum';

export function createAuthProviderConfig(appConfigService: AppConfigService) {
  return {
    [UserProvider.NAVER]: {
      tokenUrl: 'https://nid.naver.com/oauth2.0/token',
      tokenHeader: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      tokenBody: (authorizeCode: string) => ({
        grant_type: 'authorization_code',
        client_id: appConfigService.get<string>(ENV_KEY.NAVER_CLIENT_ID),
        client_secret: appConfigService.get<string>(
          ENV_KEY.NAVER_CLIENT_SECRET,
        ),
        code: authorizeCode,
        redirect_uri: appConfigService.get<string>(ENV_KEY.NAVER_REDIRECT_URI),
        state: 'test',
      }),
      userInfoUrl: 'https://openapi.naver.com/v1/nid/me',
      userInfoHeader: (socialAccessToken: string) => ({
        Authorization: `Bearer ${socialAccessToken}`,
      }),
    },
    [UserProvider.KAKAO]: {
      tokenUrl: 'https://kauth.kakao.com/oauth/token',
      tokenHeader: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      tokenBody: (authorizeCode: string) => ({
        grant_type: 'authorization_code',
        client_id: appConfigService.get<string>(ENV_KEY.KAKAO_CLIENT_ID),
        redirect_uri: appConfigService.get<string>(ENV_KEY.KAKAO_REDIRECT_URI),
        code: authorizeCode,
      }),
      userInfoUrl: 'https://kapi.kakao.com/v2/user/me',
      userInfoHeader: (socialAccessToken: string) => ({
        Authorization: `Bearer ${socialAccessToken}`,
      }),
    },
    [UserProvider.GOOGLE]: {
      tokenUrl: 'https://oauth2.googleapis.com/token',
      tokenHeader: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      tokenBody: (authorizeCode: string) => ({
        grant_type: 'authorization_code',
        client_id: appConfigService.get<string>(ENV_KEY.GOOGLE_CLIENT_ID),
        client_secret: appConfigService.get<string>(
          ENV_KEY.GOOGLE_CLIENT_SECRET,
        ),
        code: authorizeCode,
        redirect_uri: appConfigService.get<string>(ENV_KEY.GOOGLE_REDIRECT_URI),
      }),
      userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
      userInfoHeader: (socialAccessToken: string) => ({
        Authorization: `Bearer ${socialAccessToken}`,
      }),
    },
  };
}
