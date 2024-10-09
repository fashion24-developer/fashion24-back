-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('naver', 'kakao', 'google');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('FOR_SALE', 'NOT_FOR_SALE', 'SOLD_OUT');

-- CreateTable
CREATE TABLE "admin" (
    "id" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20),
    "nickname" VARCHAR(20),
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20),
    "rank" SMALLINT NOT NULL DEFAULT 1,
    "point" INTEGER NOT NULL DEFAULT 0,
    "provider" "Provider" NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "unique_id" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255),
    "gender" BOOLEAN,
    "birth" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_token" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "social_access_token" VARCHAR(255) NOT NULL,
    "social_refresh_token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy" (
    "id" VARCHAR(50) NOT NULL,
    "look_id" INTEGER,
    "fancy_type_id" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "cost_price" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount_rate" SMALLINT NOT NULL DEFAULT 0,
    "description1" TEXT,
    "description2" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'NOT_FOR_SALE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy_image" (
    "id" SERIAL NOT NULL,
    "fancy_id" VARCHAR(50) NOT NULL,
    "plating_color_id" INTEGER NOT NULL,
    "image_url" VARCHAR(1024) NOT NULL,
    "order" SMALLINT NOT NULL,

    CONSTRAINT "fancy_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy_size_stock" (
    "id" SERIAL NOT NULL,
    "fancy_id" VARCHAR(50) NOT NULL,
    "size_id" INTEGER NOT NULL,
    "quantity" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fancy_size_stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "fancy_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy_look" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "image_url" VARCHAR(1024) NOT NULL,

    CONSTRAINT "fancy_look_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plating_color" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "image_url" VARCHAR(1024) NOT NULL,

    CONSTRAINT "plating_color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy_plating_color" (
    "id" SERIAL NOT NULL,
    "fancy_id" VARCHAR(50) NOT NULL,
    "fancy_plating_color_id" INTEGER NOT NULL,
    "order" SMALLINT NOT NULL,

    CONSTRAINT "fancy_plating_color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canceled_order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "reason" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "canceled_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "invoice_number" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "additional_price" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy_order_item" (
    "id" SERIAL NOT NULL,
    "fancy_id" VARCHAR(50) NOT NULL,
    "order_id" INTEGER,
    "package_id" SMALLINT NOT NULL,
    "quantity" SMALLINT NOT NULL,
    "option" JSONB NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fancy_order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatever_order_item" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "order_id" INTEGER,
    "package_id" SMALLINT NOT NULL,
    "parts" JSONB NOT NULL,
    "quantity" SMALLINT NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "whatever_order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fancy_review" (
    "id" SERIAL NOT NULL,
    "fancy_id" VARCHAR(50) NOT NULL,
    "user_id" INTEGER,
    "fancy_order_item_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "image_urls" VARCHAR(1024)[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fancy_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatever_review" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "item_id" INTEGER NOT NULL,
    "whatever_order_item_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "image_urls" VARCHAR(1024)[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "whatever_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slots" JSONB NOT NULL,
    "three_d_url" VARCHAR(1024) NOT NULL,
    "order" SMALLINT NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_example" (
    "id" SMALLSERIAL NOT NULL,
    "item_id" SMALLINT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "parts" JSONB NOT NULL,
    "order" SMALLINT NOT NULL,
    "image_url" VARCHAR(1024) NOT NULL,

    CONSTRAINT "item_example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finishing" (
    "id" SERIAL NOT NULL,
    "item_id" SMALLINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "cost_price" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount_rate" SMALLINT NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "status" "ProductStatus" NOT NULL DEFAULT 'NOT_FOR_SALE',
    "order" SMALLINT NOT NULL,
    "three_d_url" VARCHAR(1024) NOT NULL,
    "image_url" VARCHAR(1024) NOT NULL,

    CONSTRAINT "finishing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chain" (
    "id" SERIAL NOT NULL,
    "item_id" SMALLINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "cost_price" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount_rate" SMALLINT NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "status" "ProductStatus" NOT NULL DEFAULT 'NOT_FOR_SALE',
    "order" SMALLINT NOT NULL,
    "three_d_url" VARCHAR(1024) NOT NULL,
    "image_url" VARCHAR(1024) NOT NULL,

    CONSTRAINT "chain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "cost_price" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount_rate" SMALLINT NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "status" "ProductStatus" NOT NULL DEFAULT 'NOT_FOR_SALE',
    "order" SMALLINT NOT NULL,
    "three_d_url" VARCHAR(1024) NOT NULL,
    "image_url" VARCHAR(1024) NOT NULL,

    CONSTRAINT "pendant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "terms" (
    "id" SMALLSERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "version" VARCHAR(50) NOT NULL,
    "is_valid" BOOLEAN NOT NULL DEFAULT false,
    "started_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_terms_agreement" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "terms_id" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_terms_agreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_board" (
    "id" SERIAL NOT NULL,
    "admin_board_category_id" SMALLINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_board_category" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,

    CONSTRAINT "admin_board_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" SMALLSERIAL NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "answer" VARCHAR(255) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_exit_reason" (
    "id" SMALLSERIAL NOT NULL,
    "option_id" SMALLINT NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_exit_reason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_exit_option" (
    "id" SMALLSERIAL NOT NULL,
    "content" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_exit_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "number" VARCHAR(255) NOT NULL,
    "discount_price" INTEGER NOT NULL DEFAULT 0,
    "discount_rate" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_question" (
    "id" SERIAL NOT NULL,
    "QNA_category_id" SMALLINT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_answer" (
    "id" SERIAL NOT NULL,
    "product_question_id" SMALLINT NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QNA_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "QNA_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FancyToTag" (
    "A" VARCHAR(50) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemToPendant" (
    "A" SMALLINT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_nickname_key" ON "user"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_unique_id_key" ON "user"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_user_id_key" ON "user_token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_social_access_token_key" ON "user_token"("social_access_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_social_refresh_token_key" ON "user_token"("social_refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "fancy_name_key" ON "fancy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "fancy_size_stock_fancy_id_size_id_key" ON "fancy_size_stock"("fancy_id", "size_id");

-- CreateIndex
CREATE UNIQUE INDEX "size_name_key" ON "size"("name");

-- CreateIndex
CREATE UNIQUE INDEX "fancy_type_name_key" ON "fancy_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "fancy_look_name_key" ON "fancy_look"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "plating_color_name_key" ON "plating_color"("name");

-- CreateIndex
CREATE UNIQUE INDEX "fancy_plating_color_fancy_id_fancy_plating_color_id_key" ON "fancy_plating_color"("fancy_id", "fancy_plating_color_id");

-- CreateIndex
CREATE UNIQUE INDEX "package_name_key" ON "package"("name");

-- CreateIndex
CREATE UNIQUE INDEX "fancy_review_fancy_order_item_id_key" ON "fancy_review"("fancy_order_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "whatever_review_whatever_order_item_id_key" ON "whatever_review"("whatever_order_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_order_key" ON "item"("order");

-- CreateIndex
CREATE UNIQUE INDEX "item_example_order_key" ON "item_example"("order");

-- CreateIndex
CREATE UNIQUE INDEX "finishing_name_key" ON "finishing"("name");

-- CreateIndex
CREATE UNIQUE INDEX "chain_name_key" ON "chain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pendant_name_key" ON "pendant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_terms_agreement_user_id_terms_id_key" ON "user_terms_agreement"("user_id", "terms_id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_board_category_name_key" ON "admin_board_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "coupon_number_key" ON "coupon"("number");

-- CreateIndex
CREATE UNIQUE INDEX "product_answer_product_question_id_key" ON "product_answer"("product_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "_FancyToTag_AB_unique" ON "_FancyToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FancyToTag_B_index" ON "_FancyToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToPendant_AB_unique" ON "_ItemToPendant"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToPendant_B_index" ON "_ItemToPendant"("B");

-- AddForeignKey
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy" ADD CONSTRAINT "fancy_look_id_fkey" FOREIGN KEY ("look_id") REFERENCES "fancy_look"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy" ADD CONSTRAINT "fancy_fancy_type_id_fkey" FOREIGN KEY ("fancy_type_id") REFERENCES "fancy_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_image" ADD CONSTRAINT "fancy_image_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_image" ADD CONSTRAINT "fancy_image_plating_color_id_fkey" FOREIGN KEY ("plating_color_id") REFERENCES "fancy_plating_color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_size_stock" ADD CONSTRAINT "fancy_size_stock_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_size_stock" ADD CONSTRAINT "fancy_size_stock_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "size"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_plating_color" ADD CONSTRAINT "fancy_plating_color_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_plating_color" ADD CONSTRAINT "fancy_plating_color_fancy_plating_color_id_fkey" FOREIGN KEY ("fancy_plating_color_id") REFERENCES "plating_color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canceled_order" ADD CONSTRAINT "canceled_order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canceled_order" ADD CONSTRAINT "canceled_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_order_item" ADD CONSTRAINT "fancy_order_item_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_order_item" ADD CONSTRAINT "fancy_order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_order_item" ADD CONSTRAINT "fancy_order_item_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_order_item" ADD CONSTRAINT "whatever_order_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_order_item" ADD CONSTRAINT "whatever_order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_order_item" ADD CONSTRAINT "whatever_order_item_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_review" ADD CONSTRAINT "fancy_review_fancy_id_fkey" FOREIGN KEY ("fancy_id") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_review" ADD CONSTRAINT "fancy_review_fancy_order_item_id_fkey" FOREIGN KEY ("fancy_order_item_id") REFERENCES "fancy_order_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fancy_review" ADD CONSTRAINT "fancy_review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_review" ADD CONSTRAINT "whatever_review_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_review" ADD CONSTRAINT "whatever_review_whatever_order_item_id_fkey" FOREIGN KEY ("whatever_order_item_id") REFERENCES "whatever_order_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whatever_review" ADD CONSTRAINT "whatever_review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_example" ADD CONSTRAINT "item_example_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finishing" ADD CONSTRAINT "finishing_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chain" ADD CONSTRAINT "chain_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_terms_agreement" ADD CONSTRAINT "user_terms_agreement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_terms_agreement" ADD CONSTRAINT "user_terms_agreement_terms_id_fkey" FOREIGN KEY ("terms_id") REFERENCES "terms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_board" ADD CONSTRAINT "admin_board_admin_board_category_id_fkey" FOREIGN KEY ("admin_board_category_id") REFERENCES "admin_board_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_exit_reason" ADD CONSTRAINT "user_exit_reason_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "user_exit_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_question" ADD CONSTRAINT "product_question_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_question" ADD CONSTRAINT "product_question_QNA_category_id_fkey" FOREIGN KEY ("QNA_category_id") REFERENCES "QNA_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_answer" ADD CONSTRAINT "product_answer_product_question_id_fkey" FOREIGN KEY ("product_question_id") REFERENCES "product_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FancyToTag" ADD CONSTRAINT "_FancyToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "fancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FancyToTag" ADD CONSTRAINT "_FancyToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToPendant" ADD CONSTRAINT "_ItemToPendant_A_fkey" FOREIGN KEY ("A") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToPendant" ADD CONSTRAINT "_ItemToPendant_B_fkey" FOREIGN KEY ("B") REFERENCES "pendant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
