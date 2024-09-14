/*
  Warnings:

  - A unique constraint covering the columns `[fancy_id,option_id]` on the table `fancy_option` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fancy_uuid,sub_option_id]` on the table `fancy_sub_option` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fancy_option_fancy_id_option_id_key" ON "fancy_option"("fancy_id", "option_id");

-- CreateIndex
CREATE UNIQUE INDEX "fancy_sub_option_fancy_uuid_sub_option_id_key" ON "fancy_sub_option"("fancy_uuid", "sub_option_id");
