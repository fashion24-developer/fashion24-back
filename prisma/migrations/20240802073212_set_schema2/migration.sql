/*
  Warnings:

  - The primary key for the `fancy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sub_option` on the `fancy` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `fancy` table. All the data in the column will be lost.
  - The `status` column on the `fancy` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `fancy_uuid` on the `fancy_image` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `fancy_image` table. All the data in the column will be lost.
  - You are about to drop the column `fancy_uuid` on the `fancy_option` table. All the data in the column will be lost.
  - The `status` column on the `parts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `image` on the `parts_image` table. All the data in the column will be lost.
  - You are about to drop the column `admin` on the `user` table. All the data in the column will be lost.
  - The primary key for the `whatever` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `whatever` table. All the data in the column will be lost.
  - The `status` column on the `whatever` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `id` to the `fancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fancy_id` to the `fancy_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `fancy_image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fancy_id` to the `fancy_option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `parts_image` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- DropForeignKey
ALTER TABLE "_CategoryToWhatever" DROP CONSTRAINT "_CategoryToWhatever_B_fkey";

-- DropForeignKey
ALTER TABLE "_FancyToLook" DROP CONSTRAINT "_FancyToLook_A_fkey";

-- DropForeignKey
ALTER TABLE "_FancyToTag" DROP CONSTRAINT "_FancyToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToWhatever" DROP CONSTRAINT "_TagToWhatever_B_fkey";

-- DropForeignKey
ALTER TABLE "fancy_image" DROP CONSTRAINT "fancy_image_fancy_uuid_fkey";

-- DropForeignKey
ALTER TABLE "fancy_option" DROP CONSTRAINT "fancy_option_fancy_uuid_fkey";

-- DropForeignKey
ALTER TABLE "fancy_sub_option" DROP CONSTRAINT "fancy_sub_option_fancy_uuid_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_fancy_uuid_fkey";

-- DropForeignKey
ALTER TABLE "whatever_order_item" DROP CONSTRAINT "whatever_order_item_whatever_id_fkey";

-- DropIndex
DROP INDEX "address_user_id_key";

-- AlterTable
ALTER TABLE "_CategoryToWhatever" ALTER COLUMN "B" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "_TagToWhatever" ALTER COLUMN "B" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "fancy" DROP CONSTRAINT "fancy_pkey",
DROP COLUMN "sub_option",
DROP COLUMN "uuid",
ADD COLUMN     "id" VARCHAR(50) NOT NULL,
ALTER COLUMN "description1" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'INACTIVE',
ADD CONSTRAINT "fancy_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "fancy_image" DROP COLUMN "fancy_uuid",
DROP COLUMN "image",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fancy_id" TEXT NOT NULL,
ADD COLUMN     "image_url" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "fancy_option" DROP COLUMN "fancy_uuid",
ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fancy_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "fancy_sub_option" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "option" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "order_item" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "parts" DROP COLUMN "status",
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'INACTIVE';

-- AlterTable
ALTER TABLE "parts_image" DROP COLUMN "image",
ADD COLUMN     "image_url" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "sub_option" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "admin",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "whatever" DROP CONSTRAINT "whatever_pkey",
DROP COLUMN "image",
ADD COLUMN     "image_url" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(50),
DROP COLUMN "status",
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'INACTIVE',
ADD CONSTRAINT "whatever_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "whatever_id_seq";

-- AlterTable
ALTER TABLE "whatever_order_item" ADD COLUMN     "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "whatever_id" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "FancyStatus";

-- DropEnum
DROP TYPE "WhateverStatus";

-- AddForeignKey
ALTER TABLE "fancy_image" ADD CONSTRAINT "fancy_image_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_option" ADD CONSTRAINT "fancy_option_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_sub_option" ADD CONSTRAINT "fancy_sub_option_fancy_uuid_fkey" FOREIGN KEY ("fancy_uuid") REFERENCES "fancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_fancy_uuid_fkey" FOREIGN KEY ("fancy_uuid") REFERENCES "fancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_order_item" ADD CONSTRAINT "whatever_order_item_whatever_id_fkey" FOREIGN KEY ("whatever_id") REFERENCES "whatever"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FancyToLook" ADD CONSTRAINT "_FancyToLook_A_fkey" FOREIGN KEY ("A") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FancyToTag" ADD CONSTRAINT "_FancyToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWhatever" ADD CONSTRAINT "_TagToWhatever_B_fkey" FOREIGN KEY ("B") REFERENCES "whatever"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWhatever" ADD CONSTRAINT "_CategoryToWhatever_B_fkey" FOREIGN KEY ("B") REFERENCES "whatever"("id") ON DELETE CASCADE ON UPDATE CASCADE;
