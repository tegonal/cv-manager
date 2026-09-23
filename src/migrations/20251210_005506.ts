import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pdf_style_logo_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pdf_style_logo_display" AS ENUM('firstPageOnly', 'allPages');
  CREATE TYPE "public"."enum_pdf_style_font_family" AS ENUM('Rubik', 'Open Sans', 'Lato', 'Roboto', 'Merriweather', 'Playfair Display');
  CREATE TYPE "public"."enum_pdf_style_skill_level_display" AS ENUM('text', 'dots', 'progressBar');
  CREATE TYPE "public"."enum_pdf_style_page_format" AS ENUM('A4', 'LETTER');
  CREATE TABLE "company_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"address" varchar,
  	"city" varchar,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pdf_style" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_width" numeric DEFAULT 30,
  	"logo_position" "enum_pdf_style_logo_position" DEFAULT 'right',
  	"logo_display" "enum_pdf_style_logo_display" DEFAULT 'allPages',
  	"font_family" "enum_pdf_style_font_family" DEFAULT 'Rubik',
  	"primary_color" varchar DEFAULT '#64748b',
  	"secondary_color" varchar DEFAULT '#4d4d4d',
  	"skill_level_display" "enum_pdf_style_skill_level_display" DEFAULT 'text',
  	"margin_top" numeric DEFAULT 45,
  	"margin_bottom" numeric DEFAULT 15,
  	"margin_left" numeric DEFAULT 30,
  	"margin_right" numeric DEFAULT 30,
  	"page_format" "enum_pdf_style_page_format" DEFAULT 'A4',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pdf_style" ADD CONSTRAINT "pdf_style_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pdf_style_logo_idx" ON "pdf_style" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "company_info" CASCADE;
  DROP TABLE "pdf_style" CASCADE;
  DROP TYPE "public"."enum_pdf_style_logo_position";
  DROP TYPE "public"."enum_pdf_style_logo_display";
  DROP TYPE "public"."enum_pdf_style_font_family";
  DROP TYPE "public"."enum_pdf_style_skill_level_display";
  DROP TYPE "public"."enum_pdf_style_page_format";`)
}
