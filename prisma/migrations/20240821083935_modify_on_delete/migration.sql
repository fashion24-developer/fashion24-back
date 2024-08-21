-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "fancy_image" DROP CONSTRAINT "fancy_image_fancy_id_fkey";

-- DropForeignKey
ALTER TABLE "fancy_option" DROP CONSTRAINT "fancy_option_fancy_id_fkey";

-- DropForeignKey
ALTER TABLE "fancy_option" DROP CONSTRAINT "fancy_option_option_id_fkey";

-- DropForeignKey
ALTER TABLE "fancy_stock" DROP CONSTRAINT "fancy_stock_fancy_id_fkey";

-- DropForeignKey
ALTER TABLE "fancy_sub_option" DROP CONSTRAINT "fancy_sub_option_fancy_uuid_fkey";

-- DropForeignKey
ALTER TABLE "fancy_sub_option" DROP CONSTRAINT "fancy_sub_option_sub_option_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_fancy_uuid_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_order_id_fkey";

-- DropForeignKey
ALTER TABLE "parts_image" DROP CONSTRAINT "parts_image_parts_id_fkey";

-- DropForeignKey
ALTER TABLE "sub_option" DROP CONSTRAINT "sub_option_option_id_fkey";

-- DropForeignKey
ALTER TABLE "user_token" DROP CONSTRAINT "user_token_user_id_fkey";

-- DropForeignKey
ALTER TABLE "whatever_order_item" DROP CONSTRAINT "whatever_order_item_order_id_fkey";

-- DropForeignKey
ALTER TABLE "whatever_order_item" DROP CONSTRAINT "whatever_order_item_whatever_id_fkey";

-- AddForeignKey
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_image" ADD CONSTRAINT "fancy_image_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_stock" ADD CONSTRAINT "fancy_stock_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_option" ADD CONSTRAINT "fancy_option_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_option" ADD CONSTRAINT "fancy_option_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_sub_option" ADD CONSTRAINT "fancy_sub_option_fancy_uuid_fkey" FOREIGN KEY ("fancy_uuid") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_sub_option" ADD CONSTRAINT "fancy_sub_option_sub_option_id_fkey" FOREIGN KEY ("sub_option_id") REFERENCES "sub_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_option" ADD CONSTRAINT "sub_option_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_fancy_uuid_fkey" FOREIGN KEY ("fancy_uuid") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_order_item" ADD CONSTRAINT "whatever_order_item_whatever_id_fkey" FOREIGN KEY ("whatever_id") REFERENCES "whatever"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_order_item" ADD CONSTRAINT "whatever_order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts_image" ADD CONSTRAINT "parts_image_parts_id_fkey" FOREIGN KEY ("parts_id") REFERENCES "parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
