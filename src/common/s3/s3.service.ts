import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

@Injectable()
export class S3Service {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  // 주기적으로 S3에 파일을 업로드하는 작업
  @Cron('0 */1 * * *') // 매 1시간마다 실행
  async handleCron() {
    console.log('Running scheduled task to upload logs to S3');
    await this.uploadLogsToS3();
  }

  private async uploadLogsToS3() {
    const logDir = path.join(process.cwd(), '../logs');
    const folders = ['info', 'error'];

    folders.forEach((folder) => {
      const folderPath = path.join(logDir, folder);
      fs.readdir(folderPath, (err, files) => {
        if (err) throw err;
        files
          .filter((file) => file.endsWith('.log')) // 특정 확장자만 필터링
          .forEach(async (file) => {
            const filePath = path.join(folderPath, file);
            console.log(`Preparing to upload file: ${filePath}`);
            const fileStream = fs.createReadStream(filePath);
            const uploadParams = {
              Bucket: process.env.S3_LOG_BUCKET_NAME,
              Key: `logs/${folder}/${file}`,
              Body: fileStream,
              ContentType: 'text/plain'
            };

            try {
              const command = new PutObjectCommand(uploadParams);
              const data = await this.s3Client.send(command);
              console.log(`File uploaded successfully at ${uploadParams.Key}`);
            } catch (err) {
              console.error('Error uploading file to S3', err);
            }
          });
      });
    });
  }
}
