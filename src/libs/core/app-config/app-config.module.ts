import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import Joi from 'joi';

import { ENV_KEY } from '@src/libs/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/libs/core/app-config/services/app-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      validationSchema: Joi.object({
        [ENV_KEY.PORT]: Joi.number().default(3000),
        [ENV_KEY.NODE_ENV]: Joi.string().required(),
        /**
         * @todo dns 적용하면 default 제거 및 required 로 변경
         */
        [ENV_KEY.DOMAIN]: Joi.string().default('http://localhost:3000'),
        [ENV_KEY.DATABASE_URL]: Joi.string().required(),
        [ENV_KEY.NAVER_CLIENT_ID]: Joi.string().required(),
        [ENV_KEY.NAVER_CLIENT_SECRET]: Joi.string().required(),
        [ENV_KEY.NAVER_REDIRECT_URI]: Joi.string().required(),
        [ENV_KEY.KAKAO_CLIENT_ID]: Joi.string().required(),
        [ENV_KEY.KAKAO_REDIRECT_URI]: Joi.string().required(),
        [ENV_KEY.GOOGLE_CLIENT_ID]: Joi.string().required(),
        [ENV_KEY.GOOGLE_CLIENT_SECRET]: Joi.string().required(),
        [ENV_KEY.GOOGLE_REDIRECT_URI]: Joi.string().required(),
        [ENV_KEY.ACCESS_TOKEN_SECRET_KEY]: Joi.string().required(),
        [ENV_KEY.REFRESH_TOKEN_SECRET_KEY]: Joi.string().required(),
        [ENV_KEY.REDIS_HOST]: Joi.string().required(),
        [ENV_KEY.REDIS_PORT]: Joi.number().required(),
        [ENV_KEY.REDIS_PASSWORD]: Joi.optional(),
        [ENV_KEY.COOKIE_PARSER_SECRET]: Joi.string().required()
      }),
      isGlobal: true
    })
  ],
  providers: [ConfigService, AppConfigService],
  exports: [AppConfigService]
})
export class AppConfigModule implements OnApplicationBootstrap {
  constructor(private readonly appConfigService: AppConfigService) {}

  onApplicationBootstrap() {
    console.info(this.appConfigService.getAllMap());
  }
}
