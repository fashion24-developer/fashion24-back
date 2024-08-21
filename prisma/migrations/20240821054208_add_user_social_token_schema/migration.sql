-- CreateTable
CREATE TABLE "user_social_token" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "access_token" VARCHAR(255) NOT NULL,
    "refresh_token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_social_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_social_token_access_token_key" ON "user_social_token"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_social_token_refresh_token_key" ON "user_social_token"("refresh_token");

-- AddForeignKey
ALTER TABLE "user_social_token" ADD CONSTRAINT "user_social_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
