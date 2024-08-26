# ============================
# Build Stage
# ============================
FROM node:22-alpine3.18 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사
COPY package*.json ./

# prisma 디렉토리 복사
COPY prisma ./prisma

# npm install
RUN npm ci --only=production

# /dist 디렉토리 복사
COPY ./dist ./dist

# ============================
# Production Stage
# ============================
FROM node:22-alpine3.18

# 작업 디렉토리 설정
WORKDIR /app

# /app 디렉토리에 필요한 파일 복사
COPY --from=builder /app .

# 컨테이너 실행 시 실행될 명령어
CMD ["npm", "run", "start:migrate:prod"]
