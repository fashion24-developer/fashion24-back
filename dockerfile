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

# 소스 코드 복사
COPY . .

# 의존성 설치 및 빌드
RUN npm ci && npm run build


# ============================
# Production Stage
# ============================
FROM node:22-alpine3.18

# 작업 디렉토리 설정
WORKDIR /app

# /dist 디렉토리와 필요한 파일 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# 컨테이너 실행 시 실행될 명령어.
CMD ["npm", "run", "start:migrate:prod"]
