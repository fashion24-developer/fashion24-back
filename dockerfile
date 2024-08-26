# Base image
FROM node:22-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사
COPY package*.json ./
COPY prisma ./

# npm install
RUN npm ci

# /dist 디렉토리 복사
COPY ./dist ./dist

# 컨테이너 실행 시 실행될 명령어
CMD ["npm", "run", "start:prod"]

# port 설정
EXPOSE 3000