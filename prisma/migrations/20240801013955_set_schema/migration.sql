-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'KAKAO', 'NAVER');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PREPARING', 'DEPARTURE', 'PICKED_UP', 'IN_TRANSIT', 'ARRIVED_AT_DEST', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FancyStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Packaging" AS ENUM ('DEFAULT', 'SPECIAL');

-- CreateEnum
CREATE TYPE "WhateverStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "rank" SMALLINT NOT NULL DEFAULT 1,
    "point" INTEGER NOT NULL DEFAULT 0,
    "provider" "Provider" NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "road_full_addr" VARCHAR(255) NOT NULL,
    "road_addr_part1" VARCHAR(255) NOT NULL,
    "addr_detail" VARCHAR(255),
    "zip_no" INTEGER NOT NULL,
    "si_nm" VARCHAR(20) NOT NULL,
    "sgg_nm" VARCHAR(20) NOT NULL,
    "emd_nm" VARCHAR(20) NOT NULL,
    "rn" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy" (
    "uuid" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cost_price" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount_rate" SMALLINT NOT NULL DEFAULT 0,
    "description1" VARCHAR(255),
    "description2" TEXT,
    "quantity" SMALLINT NOT NULL DEFAULT 0,
    "status" "FancyStatus" NOT NULL DEFAULT 'INACTIVE',
    "sub_option" TEXT[],
    "default_display" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "fancy_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "fancy_image" (
    "id" SERIAL NOT NULL,
    "fancy_uuid" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "order" SMALLINT NOT NULL,

    CONSTRAINT "fancy_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy_option" (
    "id" SERIAL NOT NULL,
    "fancy_uuid" TEXT NOT NULL,
    "option_id" INTEGER NOT NULL,

    CONSTRAINT "fancy_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "option" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy_sub_option" (
    "id" SERIAL NOT NULL,
    "fancy_uuid" TEXT NOT NULL,
    "option_id" INTEGER NOT NULL,
    "sub_option_id" INTEGER NOT NULL,

    CONSTRAINT "fancy_sub_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_option" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "option_id" INTEGER NOT NULL,

    CONSTRAINT "sub_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "look" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "look_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatever" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cost_price" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount_rate" SMALLINT NOT NULL DEFAULT 0,
    "image" TEXT,
    "description" TEXT,
    "quantity" SMALLINT NOT NULL DEFAULT 0,
    "status" "WhateverStatus" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "whatever_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "delivery_status" "DeliveryStatus" NOT NULL DEFAULT 'PREPARING',
    "totalPrice" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "refunded_at" TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "fancy_uuid" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "quantity" SMALLINT NOT NULL,
    "option" VARCHAR(255),
    "price" INTEGER NOT NULL,
    "packaging" "Packaging" NOT NULL DEFAULT 'DEFAULT',

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatever_order_item" (
    "id" SERIAL NOT NULL,
    "whatever_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "quantity" SMALLINT NOT NULL,
    "price" INTEGER NOT NULL,
    "packaging" "Packaging" NOT NULL DEFAULT 'DEFAULT',

    CONSTRAINT "whatever_order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "cost_price" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount_rate" SMALLINT NOT NULL DEFAULT 0,
    "description" TEXT,
    "quantity" SMALLINT NOT NULL DEFAULT 0,
    "status" SMALLINT NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts_image" (
    "id" SERIAL NOT NULL,
    "parts_id" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "parts_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FancyToLook" (
    "A" VARCHAR(50) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FancyToTag" (
    "A" VARCHAR(50) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TagToWhatever" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToWhatever" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "address_user_id_key" ON "address"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "fancy_name_key" ON "fancy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "option_name_key" ON "option"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sub_option_name_key" ON "sub_option"("name");

-- CreateIndex
CREATE UNIQUE INDEX "look_name_key" ON "look"("name");

-- CreateIndex
CREATE UNIQUE INDEX "whatever_name_key" ON "whatever"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "parts_name_key" ON "parts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FancyToLook_AB_unique" ON "_FancyToLook"("A", "B");

-- CreateIndex
CREATE INDEX "_FancyToLook_B_index" ON "_FancyToLook"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FancyToTag_AB_unique" ON "_FancyToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FancyToTag_B_index" ON "_FancyToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToWhatever_AB_unique" ON "_TagToWhatever"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToWhatever_B_index" ON "_TagToWhatever"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToWhatever_AB_unique" ON "_CategoryToWhatever"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToWhatever_B_index" ON "_CategoryToWhatever"("B");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_image" ADD CONSTRAINT "fancy_image_fancy_uuid_fkey" FOREIGN KEY ("fancy_uuid") REFERENCES "fancy"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_option" ADD CONSTRAINT "fancy_option_fancy_uuid_fkey" FOREIGN KEY ("fancy_uuid") REFERENCES "fancy"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_option" ADD CONSTRAINT "fancy_option_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_sub_option" ADD CONSTRAINT "fancy_sub_option_fancy_uuid_fkey" FOREIGN KEY ("fancy_uuid") REFERENCES "fancy"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_sub_option" ADD CONSTRAINT "fancy_sub_option_sub_option_id_fkey" FOREIGN KEY ("sub_option_id") REFERENCES "sub_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_option" ADD CONSTRAINT "sub_option_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_fancy_uuid_fkey" FOREIGN KEY ("fancy_uuid") REFERENCES "fancy"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_order_item" ADD CONSTRAINT "whatever_order_item_whatever_id_fkey" FOREIGN KEY ("whatever_id") REFERENCES "whatever"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_order_item" ADD CONSTRAINT "whatever_order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts_image" ADD CONSTRAINT "parts_image_parts_id_fkey" FOREIGN KEY ("parts_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FancyToLook" ADD CONSTRAINT "_FancyToLook_A_fkey" FOREIGN KEY ("A") REFERENCES "fancy"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FancyToLook" ADD CONSTRAINT "_FancyToLook_B_fkey" FOREIGN KEY ("B") REFERENCES "look"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FancyToTag" ADD CONSTRAINT "_FancyToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "fancy"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FancyToTag" ADD CONSTRAINT "_FancyToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWhatever" ADD CONSTRAINT "_TagToWhatever_A_fkey" FOREIGN KEY ("A") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWhatever" ADD CONSTRAINT "_TagToWhatever_B_fkey" FOREIGN KEY ("B") REFERENCES "whatever"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWhatever" ADD CONSTRAINT "_CategoryToWhatever_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWhatever" ADD CONSTRAINT "_CategoryToWhatever_B_fkey" FOREIGN KEY ("B") REFERENCES "whatever"("id") ON DELETE CASCADE ON UPDATE CASCADE;
