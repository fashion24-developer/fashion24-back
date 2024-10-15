import { Module } from '@nestjs/common';

import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

import { AppConfigModule } from '@src/libs/core/app-config/app-config.module';
import { IAppConfigService } from '@src/libs/core/app-config/services/i-app-config-service.interface';
import { APP_CONFIG_SERVICE_DI_TOKEN } from '@src/libs/core/app-config/tokens/app-config.di-token';
import { Key } from '@src/libs/core/app-config/types/app-config.type';
import { MessengerModule } from '@src/libs/core/messenger/messenger.module';

const dirname = `${process.cwd()}/../logs`; //node를 실행시킨 경로 바깥의 logs 폴더

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: dirname + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxSize: '100m', // 100mb
    maxFiles: 365, //365일치 로그파일 저장
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
    format: winston.format.combine(
      winston.format.timestamp({ format: '| YYYY-MM-DD HH:mm:ss.SSS |' }), // 시간 표시
      winston.format.errors({ stack: true }), // 에러 메시지 출력
      winston.format.printf(({ level, message, timestamp, stack, response }) => {
        return stack
          ? response?.data
            ? `${timestamp} [${level}] ${message}\n${stack}\n ErrorResponseData : ${JSON.stringify(response.data)}`
            : `${timestamp} [${level}] ${message}\n${stack}`
          : `${timestamp} [${level}] ${message}`;
      }) // 로그 포맷
    )
  };
};

@Module({
  imports: [
    AppConfigModule,
    WinstonModule.forRootAsync({
      inject: [APP_CONFIG_SERVICE_DI_TOKEN],
      useFactory: (appConfigService: IAppConfigService<Key>) => {
        return {
          transports: [
            new winston.transports.Console({
              level: 'info',
              format: winston.format.combine(
                winston.format.colorize({ level: true }), // 색깔 넣어서 출력
                winston.format.timestamp({ format: '| YYYY-MM-DD HH:mm:ss.SSS |' }), // 시간 표시
                winston.format.errors({ stack: true }), // 에러 메시지 출력
                winston.format.printf(({ level, message, timestamp, stack, response }) => {
                  return stack
                    ? response?.data
                      ? `${timestamp} [${level}] ${message}\n${stack}\n ErrorResponseData : ${JSON.stringify(response.data)}`
                      : `${timestamp} [${level}] ${message}\n${stack}`
                    : `${timestamp} [${level}] ${message}`;
                }) // 로그 포맷
              )
            }),
            ...(appConfigService.isLocal()
              ? []
              : [new winstonDaily(dailyOptions('info')), new winstonDaily(dailyOptions('error'))])
          ]
        };
      }
    }),
    MessengerModule
  ]
})
export class CoreModule {}
