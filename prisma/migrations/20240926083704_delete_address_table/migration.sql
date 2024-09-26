/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" VARCHAR(255);

-- DropTable
DROP TABLE "address";
