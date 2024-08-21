-- CreateTable
CREATE TABLE "user_token" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "social_access_token" VARCHAR(255) NOT NULL,
    "social_refresh_token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_token_social_access_token_key" ON "user_token"("social_access_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_social_refresh_token_key" ON "user_token"("social_refresh_token");

-- AddForeignKey
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
