// logger.module.ts
import { Module } from '@nestjs/common';

import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

import {
  daliyOptions,
  logFormat,
  s3StreamError,
  s3StreamInfo
} from '@src/core/app-config/logger/logger.config';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.colorize({ level: true }), // 색깔 넣어서 출력
            winston.format.timestamp({ format: '| YYYY-MM-DD HH:mm:ss.SSS |' }), // 시간 표시
            winston.format.errors({ stack: true }), // 에러 메시지 출력
            logFormat // 로그 포맷
          )
        }),

        new winstonDaily(daliyOptions('info')),
        new winstonDaily(daliyOptions('error')),

        new winston.transports.Stream({
          stream: s3StreamInfo,
          level: 'info'
        }),

        new winston.transports.Stream({
          stream: s3StreamError,
          level: 'error'
        })
      ]
    })
  ],
  exports: [WinstonModule]
})
export class LoggerModule {}
