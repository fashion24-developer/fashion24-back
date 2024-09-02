/*
  Warnings:

  - You are about to drop the column `default_display` on the `fancy` table. All the data in the column will be lost.
  - The `option` column on the `order_item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "fancy" DROP COLUMN "default_display";

-- AlterTable
ALTER TABLE "fancy_stock" ADD COLUMN     "option" VARCHAR(255)[];

-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "option",
ADD COLUMN     "option" VARCHAR(255)[];
