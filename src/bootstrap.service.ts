import { ClassSerializerInterceptor, INestApplication, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import cookieParser from 'cookie-parser';
import { singularize } from 'inflection';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ENV_KEY } from '@src/libs/core/app-config/constants/app-config.constant';
import { IAppConfigService } from '@src/libs/core/app-config/services/i-app-config-service.interface';
import { APP_CONFIG_SERVICE_DI_TOKEN } from '@src/libs/core/app-config/tokens/app-config.di-token';
import { Key } from '@src/libs/core/app-config/types/app-config.type';
import { HttpExceptionFilter } from '@src/libs/exceptions/exception-filters/http-exception.filter';
import { CustomValidationPipe } from '@src/pipes/custom-validation.pipe';

export const globalPrefix = 'api';

@Injectable()
export class BootstrapService {
  setCors(app: INestApplication) {
    app.enableCors();
  }

  setLogger(app: INestApplication) {
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  }

  setPathPrefix(app: INestApplication) {
    app.setGlobalPrefix(globalPrefix);
  }

  setInterceptor(app: INestApplication) {
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  }

  setPipe(app: INestApplication) {
    const options = {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    };

    app.useGlobalPipes(
      new CustomValidationPipe({
        ...options
      })
    );
  }

  setFilter(app: INestApplication) {
    app.useGlobalFilters(app.get(HttpExceptionFilter));
  }

  setSwagger(app: INestApplication) {
    const appConfigService = app.get<IAppConfigService<Key>>(APP_CONFIG_SERVICE_DI_TOKEN);

    if (appConfigService.isProduction()) {
      return;
    }

    const DOMAIN = appConfigService.get<string>(ENV_KEY.DOMAIN);
    const JSON_PATH = 'api-docs-json';
    const YAML_PATH = 'api-docs-yaml';

    const config = new DocumentBuilder()
      .setTitle('fashion24')
      .setDescription(
        'fashion24 api</br>' +
          `<a target="_black" href="${DOMAIN}/${JSON_PATH}">json document</a></br>` +
          `<a target="_black" href="${DOMAIN}/${YAML_PATH}">yaml document</a></br>`
      )
      .setVersion('0.1')
      .addCookieAuth(
        'accessToken',
        {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
          description: 'access token'
        },
        'accessToken'
      )
      .addCookieAuth(
        'refreshToken',
        {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
          description: 'refresh token'
        },
        'refreshToken'
      )
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (controllerKey: string, methodKey: string) => {
        const controllerName = singularize(controllerKey.replace(/Controller$/, '')).replace(
          /^(.)/,
          (matchStr) => matchStr.toLowerCase()
        );

        return `${controllerName}_${methodKey}`;
      }
    });

    SwaggerModule.setup('api-docs', app, document, {
      jsonDocumentUrl: JSON_PATH,
      yamlDocumentUrl: YAML_PATH,
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: (a: Map<any, any>, b: Map<any, any>) => {
          const order = {
            post: '0',
            get: '1',
            put: '2',
            patch: '3',
            delete: '4'
          };

          return order[a.get('method')].localeCompare(order[b.get('method')]);
        }
      }
    });
  }

  setCookieParser(app: INestApplication) {
    const appConfigService = app.get<IAppConfigService<Key>>(APP_CONFIG_SERVICE_DI_TOKEN);
    const secret = appConfigService.get<string>(ENV_KEY.COOKIE_PARSER_SECRET);
    app.use(cookieParser(secret));
  }

  async startingServer(app: INestApplication) {
    const appConfigService = app.get<IAppConfigService<Key>>(APP_CONFIG_SERVICE_DI_TOKEN);

    const PORT = appConfigService.get<number>(ENV_KEY.PORT);

    await app.listen(PORT);

    console.info(`Server listening on port ${PORT}`);
  }
}
