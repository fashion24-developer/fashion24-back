/*
  Warnings:

  - The `gender` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "gender",
ADD COLUMN     "gender" "GENDER" NOT NULL DEFAULT 'UNKNOWN';
