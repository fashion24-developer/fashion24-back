import {
  ClassSerializerInterceptor,
  INestApplication,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { singularize } from 'inflection';

import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import { HttpExceptionFilter } from '@src/exceptions/exception-filters/http-exception.filter';
import { CustomValidationPipe } from '@src/pipes/custom-validation.pipe';

@Injectable()
export class BootstrapService {
  setCors(app: INestApplication) {
    app.enableCors();
  }

  setLogger(app: INestApplication) {
    const logger = new Logger();

    app.useLogger(logger);
  }

  setPathPrefix(app: INestApplication) {
    app.setGlobalPrefix('api');
  }

  setInterceptor(app: INestApplication) {
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
  }

  setPipe(app: INestApplication) {
    const options = {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    };

    app.useGlobalPipes(
      new CustomValidationPipe({
        ...options,
      }),
    );
  }

  setFilter(app: INestApplication) {
    app.useGlobalFilters(app.get(HttpExceptionFilter));
  }

  setSwagger(app: INestApplication) {
    const appConfigService = app.get<AppConfigService>(AppConfigService);

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
          `<a target="_black" href="${DOMAIN}/${YAML_PATH}">yaml document</a></br>`,
      )
      .setVersion('0.1')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (controllerKey: string, methodKey: string) => {
        const controllerName = singularize(
          controllerKey.replace(/Controller$/, ''),
        ).replace(/^(.)/, (matchStr) => matchStr.toLowerCase());

        return `${controllerName}_${methodKey}`;
      },
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
            delete: '4',
          };

          return order[a.get('method')].localeCompare(order[b.get('method')]);
        },
      },
    });
  }

  async startingServer(app: INestApplication) {
    const appConfigService = app.get<AppConfigService>(AppConfigService);

    const PORT = appConfigService.get<number>(ENV_KEY.PORT);

    await app.listen(PORT);

    console.info(`Server listening on port ${PORT}`);
  }
}
