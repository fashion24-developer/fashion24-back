/*
  Warnings:

  - You are about to drop the column `look_id` on the `fancy` table. All the data in the column will be lost.
  - You are about to drop the `size` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fancy" DROP CONSTRAINT "fancy_look_id_fkey";

-- DropForeignKey
ALTER TABLE "fancy_size_stock" DROP CONSTRAINT "fancy_size_stock_size_id_fkey";

-- AlterTable
ALTER TABLE "fancy" DROP COLUMN "look_id",
ADD COLUMN     "fancy_look_id" INTEGER;

-- DropTable
DROP TABLE "size";

-- CreateTable
CREATE TABLE "fancy_size" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "fancy_size_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fancy_size_name_key" ON "fancy_size"("name");

-- AddForeignKey
ALTER TABLE "fancy" ADD CONSTRAINT "fancy_fancy_look_id_fkey" FOREIGN KEY ("fancy_look_id") REFERENCES "fancy_look"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_size_stock" ADD CONSTRAINT "fancy_size_stock_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "fancy_size"("id") ON DELETE CASCADE ON UPDATE CASCADE;
