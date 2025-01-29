import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "cv_lang" DROP CONSTRAINT "cv_lang_lang_id_langs_id_fk";
  
  DROP INDEX IF EXISTS "cv_lang_lang_idx";
  ALTER TABLE "cv_lang" ADD COLUMN "language_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "cv_lang" ADD CONSTRAINT "cv_lang_language_id_langs_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."langs"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cv_lang_language_idx" ON "cv_lang" USING btree ("language_id");
  ALTER TABLE "cv_lang" DROP COLUMN IF EXISTS "lang_id";`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "cv_lang" DROP CONSTRAINT "cv_lang_language_id_langs_id_fk";
  
  DROP INDEX IF EXISTS "cv_lang_language_idx";
  ALTER TABLE "cv_lang" ADD COLUMN "lang_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "cv_lang" ADD CONSTRAINT "cv_lang_lang_id_langs_id_fk" FOREIGN KEY ("lang_id") REFERENCES "public"."langs"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cv_lang_lang_idx" ON "cv_lang" USING btree ("lang_id");
  ALTER TABLE "cv_lang" DROP COLUMN IF EXISTS "language_id";`);
}
