import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pdf_style_first_page_layout" AS ENUM('centered', 'leftAligned');
  ALTER TABLE "pdf_style" ADD COLUMN "logo_margin_top" numeric DEFAULT 10;
  ALTER TABLE "pdf_style" ADD COLUMN "logo_margin_left" numeric DEFAULT 10;
  ALTER TABLE "pdf_style" ADD COLUMN "logo_margin_right" numeric DEFAULT 10;
  ALTER TABLE "pdf_style" ADD COLUMN "first_page_margin_top" numeric DEFAULT 45;
  ALTER TABLE "pdf_style" ADD COLUMN "first_page_margin_bottom" numeric DEFAULT 15;
  ALTER TABLE "pdf_style" ADD COLUMN "first_page_margin_left" numeric DEFAULT 30;
  ALTER TABLE "pdf_style" ADD COLUMN "first_page_margin_right" numeric DEFAULT 30;
  ALTER TABLE "pdf_style" ADD COLUMN "first_page_layout" "enum_pdf_style_first_page_layout" DEFAULT 'centered';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pdf_style" DROP COLUMN "logo_margin_top";
  ALTER TABLE "pdf_style" DROP COLUMN "logo_margin_left";
  ALTER TABLE "pdf_style" DROP COLUMN "logo_margin_right";
  ALTER TABLE "pdf_style" DROP COLUMN "first_page_margin_top";
  ALTER TABLE "pdf_style" DROP COLUMN "first_page_margin_bottom";
  ALTER TABLE "pdf_style" DROP COLUMN "first_page_margin_left";
  ALTER TABLE "pdf_style" DROP COLUMN "first_page_margin_right";
  ALTER TABLE "pdf_style" DROP COLUMN "first_page_layout";
  DROP TYPE "public"."enum_pdf_style_first_page_layout";`)
}
