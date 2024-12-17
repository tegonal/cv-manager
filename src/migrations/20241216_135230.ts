import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "public"."_locales" ADD VALUE 'en' BEFORE 'de';
  CREATE TABLE IF NOT EXISTS "cv_skill_groups_locales" (
  	"skill_group_description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "cv_skill_groups_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "cv_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skill_id" integer,
  	"skill_group_id" integer
  );
  
  ALTER TABLE "cv_skill_highlights" DROP CONSTRAINT "cv_skill_highlights_skill_id_skill_id_fk";
  
  ALTER TABLE "cv_skill_groups_skills" DROP CONSTRAINT "cv_skill_groups_skills_skill_id_skill_id_fk";
  
  DROP INDEX IF EXISTS "cv_skill_highlights_skill_idx";
  DROP INDEX IF EXISTS "cv_skill_groups_skills_skill_idx";
  ALTER TABLE "cv_skill_highlights" ALTER COLUMN "level_id" DROP NOT NULL;
  ALTER TABLE "cv_skill_groups_skills" ALTER COLUMN "level_id" DROP NOT NULL;
  ALTER TABLE "cv_other_skills" ALTER COLUMN "level_id" DROP NOT NULL;
  ALTER TABLE "cv_locales" ALTER COLUMN "introduction" DROP NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "cv_skill_groups_locales" ADD CONSTRAINT "cv_skill_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv_skill_groups"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_rels" ADD CONSTRAINT "cv_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_rels" ADD CONSTRAINT "cv_rels_skill_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_rels" ADD CONSTRAINT "cv_rels_skill_group_fk" FOREIGN KEY ("skill_group_id") REFERENCES "public"."skill_group"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cv_rels_order_idx" ON "cv_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "cv_rels_parent_idx" ON "cv_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "cv_rels_path_idx" ON "cv_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "cv_rels_skill_id_idx" ON "cv_rels" USING btree ("skill_id");
  CREATE INDEX IF NOT EXISTS "cv_rels_skill_group_id_idx" ON "cv_rels" USING btree ("skill_group_id");
  ALTER TABLE "cv_skill_highlights" DROP COLUMN IF EXISTS "skill_id";
  ALTER TABLE "cv_skill_groups_skills" DROP COLUMN IF EXISTS "skill_id";`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "cv_skill_groups_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cv_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "cv_skill_groups_locales" CASCADE;
  DROP TABLE "cv_rels" CASCADE;
  ALTER TABLE "cv_skill_highlights" ALTER COLUMN "level_id" SET NOT NULL;
  ALTER TABLE "cv_skill_groups_skills" ALTER COLUMN "level_id" SET NOT NULL;
  ALTER TABLE "cv_other_skills" ALTER COLUMN "level_id" SET NOT NULL;
  ALTER TABLE "cv_locales" ALTER COLUMN "introduction" SET NOT NULL;
  ALTER TABLE "cv_skill_highlights" ADD COLUMN "skill_id" integer NOT NULL;
  ALTER TABLE "cv_skill_groups_skills" ADD COLUMN "skill_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "cv_skill_highlights" ADD CONSTRAINT "cv_skill_highlights_skill_id_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_skill_groups_skills" ADD CONSTRAINT "cv_skill_groups_skills_skill_id_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cv_skill_highlights_skill_idx" ON "cv_skill_highlights" USING btree ("skill_id");
  CREATE INDEX IF NOT EXISTS "cv_skill_groups_skills_skill_idx" ON "cv_skill_groups_skills" USING btree ("skill_id");
  ALTER TABLE "public"."cv_skill_highlights_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."cv_other_skills_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."cv_edu_highlights_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."cv_edu_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."cv_certs_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."cv_courses_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."cv_job_highlights_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."cv_projects_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."cv_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."skill_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."skill_group_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."langs_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."level_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "public"."project_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('de');
  ALTER TABLE "public"."cv_skill_highlights_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."cv_other_skills_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."cv_edu_highlights_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."cv_edu_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."cv_certs_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."cv_courses_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."cv_job_highlights_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."cv_projects_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."cv_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."skill_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."skill_group_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."langs_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."level_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "public"."project_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";`);
}
