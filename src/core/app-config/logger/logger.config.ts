// logger.config.ts
import * as AWS from 'aws-sdk';
import { S3StreamLogger } from 's3-streamlogger';
import winston from 'winston';

const dirname = `${process.cwd()}/../logs`; // node를 실행시킨 경로 바깥의 logs 폴더
const { combine, timestamp, printf, errors } = winston.format;
export const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});
export const daliyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: dirname + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxSize: '100m', // 100mb
    maxFiles: 365, // 365일치 로그파일 저장
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
    format: combine(
      timestamp({ format: '| YYYY-MM-DD HH:mm:ss.SSS |' }), // 시간 표시
      errors({ stack: true }), // 에러 메시지 출력
      logFormat // 로그 포맷
    )
  };
};
// S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
// S3 로그 포맷 조정
const s3LogFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});
export const s3StreamInfo = new S3StreamLogger({
  bucket: process.env.S3_LOG_BUCKET_NAME,
  access_key_id: process.env.AWS_ACCESS_KEY_ID,
  secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  folder: 'logs/info',
  rotate_every: '1d',
  name_format: '%Y-%m-%d.info.log',
  format: s3LogFormat
});
export const s3StreamError = new S3StreamLogger({
  bucket: process.env.S3_LOG_BUCKET_NAME,
  access_key_id: process.env.AWS_ACCESS_KEY_ID,
  secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  folder: 'logs/error',
  rotate_every: '1d',
  name_format: '%Y-%m-%d.error.log',
  format: s3LogFormat
});
