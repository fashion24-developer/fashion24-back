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
