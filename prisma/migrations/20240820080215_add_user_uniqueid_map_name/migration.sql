/*
  Warnings:

  - You are about to drop the column `uniqueId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unique_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unique_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_uniqueId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "uniqueId",
ADD COLUMN     "unique_id" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_unique_id_key" ON "user"("unique_id");
