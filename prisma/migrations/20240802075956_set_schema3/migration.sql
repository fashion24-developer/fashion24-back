/*
  Warnings:

  - You are about to drop the column `quantity` on the `fancy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "fancy" DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "fancy_stock" (
    "id" SERIAL NOT NULL,
    "fancy_id" TEXT NOT NULL,
    "quantity" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fancy_stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fancy_stock" ADD CONSTRAINT "fancy_stock_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
