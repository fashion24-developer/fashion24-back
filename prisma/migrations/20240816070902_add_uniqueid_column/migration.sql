/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "uniqueId" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_uniqueId_key" ON "user"("uniqueId");
