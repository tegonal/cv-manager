import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skillTable = pgTable('skill', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
  });
  // Get all skills prior
  const skills = await payload.db.drizzle.select().from(skillTable);

  payload.logger.info({ msg: 'SkillMigration', total: skills.length });

  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "cv_skill_groups_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill_id" integer NOT NULL,
  	"level_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "cv_skill_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"group_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "cv_lang" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lang_id" integer NOT NULL,
  	"level_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "skill_locales" (
  	"name" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "skill_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );

  CREATE TABLE IF NOT EXISTS "skill_group" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"organisation_id" integer,
  	"created_by_id" integer,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "skill_group_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "skill_group_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );

  CREATE TABLE IF NOT EXISTS "langs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"organisation_id" integer,
  	"created_by_id" integer,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "langs_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "langs_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );

  CREATE TABLE IF NOT EXISTS "project_locales" (
  	"name" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL,
  	CONSTRAINT "project_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );

  DROP TABLE "cv_languages";
  DROP TABLE "cv_technologies";
  DROP TABLE "cv_soft_skills";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "skill_group_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "langs_id" integer;
  DO $$ BEGIN
   ALTER TABLE "cv_skill_groups_skills" ADD CONSTRAINT "cv_skill_groups_skills_skill_id_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_skill_groups_skills" ADD CONSTRAINT "cv_skill_groups_skills_level_id_level_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."level"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_skill_groups_skills" ADD CONSTRAINT "cv_skill_groups_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv_skill_groups"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_skill_groups" ADD CONSTRAINT "cv_skill_groups_group_id_skill_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."skill_group"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_skill_groups" ADD CONSTRAINT "cv_skill_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_lang" ADD CONSTRAINT "cv_lang_lang_id_langs_id_fk" FOREIGN KEY ("lang_id") REFERENCES "public"."langs"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_lang" ADD CONSTRAINT "cv_lang_level_id_level_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."level"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_lang" ADD CONSTRAINT "cv_lang_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "skill_locales" ADD CONSTRAINT "skill_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skill"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "skill_group" ADD CONSTRAINT "skill_group_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "skill_group" ADD CONSTRAINT "skill_group_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "skill_group" ADD CONSTRAINT "skill_group_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "skill_group_locales" ADD CONSTRAINT "skill_group_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skill_group"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "langs" ADD CONSTRAINT "langs_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "langs" ADD CONSTRAINT "langs_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "langs" ADD CONSTRAINT "langs_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "langs_locales" ADD CONSTRAINT "langs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."langs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "project_locales" ADD CONSTRAINT "project_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "cv_skill_groups_skills_order_idx" ON "cv_skill_groups_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cv_skill_groups_skills_parent_id_idx" ON "cv_skill_groups_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cv_skill_groups_skills_skill_idx" ON "cv_skill_groups_skills" USING btree ("skill_id");
  CREATE INDEX IF NOT EXISTS "cv_skill_groups_skills_level_idx" ON "cv_skill_groups_skills" USING btree ("level_id");
  CREATE INDEX IF NOT EXISTS "cv_skill_groups_order_idx" ON "cv_skill_groups" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cv_skill_groups_parent_id_idx" ON "cv_skill_groups" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cv_skill_groups_group_idx" ON "cv_skill_groups" USING btree ("group_id");
  CREATE INDEX IF NOT EXISTS "cv_lang_order_idx" ON "cv_lang" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cv_lang_parent_id_idx" ON "cv_lang" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cv_lang_lang_idx" ON "cv_lang" USING btree ("lang_id");
  CREATE INDEX IF NOT EXISTS "cv_lang_level_idx" ON "cv_lang" USING btree ("level_id");
  CREATE INDEX IF NOT EXISTS "skill_group_organisation_idx" ON "skill_group" USING btree ("organisation_id");
  CREATE INDEX IF NOT EXISTS "skill_group_created_by_idx" ON "skill_group" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "skill_group_updated_by_idx" ON "skill_group" USING btree ("updated_by_id");
  CREATE INDEX IF NOT EXISTS "skill_group_created_at_idx" ON "skill_group" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "langs_organisation_idx" ON "langs" USING btree ("organisation_id");
  CREATE INDEX IF NOT EXISTS "langs_created_by_idx" ON "langs" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "langs_updated_by_idx" ON "langs" USING btree ("updated_by_id");
  CREATE INDEX IF NOT EXISTS "langs_created_at_idx" ON "langs" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skill_group_fk" FOREIGN KEY ("skill_group_id") REFERENCES "public"."skill_group"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_langs_fk" FOREIGN KEY ("langs_id") REFERENCES "public"."langs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "cv_skill_highlights_skill_idx" ON "cv_skill_highlights" USING btree ("skill_id");
  CREATE INDEX IF NOT EXISTS "cv_skill_highlights_level_idx" ON "cv_skill_highlights" USING btree ("level_id");
  CREATE INDEX IF NOT EXISTS "cv_other_skills_level_idx" ON "cv_other_skills" USING btree ("level_id");
  CREATE INDEX IF NOT EXISTS "cv_job_highlights_company_idx" ON "cv_job_highlights" USING btree ("company_id");
  CREATE INDEX IF NOT EXISTS "cv_projects_company_idx" ON "cv_projects" USING btree ("company_id");
  CREATE INDEX IF NOT EXISTS "cv_projects_project_idx" ON "cv_projects" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "cv_image_idx" ON "cv" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "cv_organisation_idx" ON "cv" USING btree ("organisation_id");
  CREATE INDEX IF NOT EXISTS "cv_created_by_idx" ON "cv" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "cv_updated_by_idx" ON "cv" USING btree ("updated_by_id");
  CREATE INDEX IF NOT EXISTS "skill_organisation_idx" ON "skill" USING btree ("organisation_id");
  CREATE INDEX IF NOT EXISTS "skill_created_by_idx" ON "skill" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "skill_updated_by_idx" ON "skill" USING btree ("updated_by_id");
  CREATE INDEX IF NOT EXISTS "level_organisation_idx" ON "level" USING btree ("organisation_id");
  CREATE INDEX IF NOT EXISTS "level_created_by_idx" ON "level" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "level_updated_by_idx" ON "level" USING btree ("updated_by_id");
  CREATE INDEX IF NOT EXISTS "company_organisation_idx" ON "company" USING btree ("organisation_id");
  CREATE INDEX IF NOT EXISTS "company_created_by_idx" ON "company" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "company_updated_by_idx" ON "company" USING btree ("updated_by_id");
  CREATE INDEX IF NOT EXISTS "project_organisation_idx" ON "project" USING btree ("organisation_id");
  CREATE INDEX IF NOT EXISTS "project_created_by_idx" ON "project" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "project_updated_by_idx" ON "project" USING btree ("updated_by_id");
  CREATE INDEX IF NOT EXISTS "media_organisation_idx" ON "media" USING btree ("organisation_id");
  CREATE INDEX IF NOT EXISTS "media_created_by_idx" ON "media" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "media_updated_by_idx" ON "media" USING btree ("updated_by_id");
  CREATE INDEX IF NOT EXISTS "organisations_created_by_idx" ON "organisations" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "organisations_updated_by_idx" ON "organisations" USING btree ("updated_by_id");
  CREATE INDEX IF NOT EXISTS "users_organisations_organisation_idx" ON "users_organisations" USING btree ("organisation_id");
  CREATE INDEX IF NOT EXISTS "users_selected_organisation_idx" ON "users" USING btree ("selected_organisation_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cv_id_idx" ON "payload_locked_documents_rels" USING btree ("cv_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_skill_id_idx" ON "payload_locked_documents_rels" USING btree ("skill_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_skill_group_id_idx" ON "payload_locked_documents_rels" USING btree ("skill_group_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_langs_id_idx" ON "payload_locked_documents_rels" USING btree ("langs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_level_id_idx" ON "payload_locked_documents_rels" USING btree ("level_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_company_id_idx" ON "payload_locked_documents_rels" USING btree ("company_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_project_id_idx" ON "payload_locked_documents_rels" USING btree ("project_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_organisations_id_idx" ON "payload_locked_documents_rels" USING btree ("organisations_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  ALTER TABLE "skill" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "skill" DROP COLUMN IF EXISTS "skill_type";
  ALTER TABLE "project" DROP COLUMN IF EXISTS "name";
  DROP TYPE "public"."enum_skill_skill_type";`);

  for (const skill of skills) {
    await payload.update({ collection: 'skill', id: skill.id, data: { name: skill.name } });
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_skill_skill_type" AS ENUM('technical', 'language', 'soft');
  CREATE TABLE IF NOT EXISTS "cv_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language_id" integer NOT NULL,
  	"level_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "cv_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill_id" integer NOT NULL,
  	"level_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "cv_soft_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"soft_skill_id" integer NOT NULL,
  	"level_id" integer NOT NULL
  );

  DROP TABLE "cv_skill_groups_skills";
  DROP TABLE "cv_skill_groups";
  DROP TABLE "cv_lang";
  DROP TABLE "skill_locales";
  DROP TABLE "skill_group";
  DROP TABLE "skill_group_locales";
  DROP TABLE "langs";
  DROP TABLE "langs_locales";
  DROP TABLE "project_locales";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_skill_group_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_langs_fk";

  DROP INDEX IF EXISTS "cv_skill_highlights_skill_idx";
  DROP INDEX IF EXISTS "cv_skill_highlights_level_idx";
  DROP INDEX IF EXISTS "cv_other_skills_level_idx";
  DROP INDEX IF EXISTS "cv_job_highlights_company_idx";
  DROP INDEX IF EXISTS "cv_projects_company_idx";
  DROP INDEX IF EXISTS "cv_projects_project_idx";
  DROP INDEX IF EXISTS "cv_image_idx";
  DROP INDEX IF EXISTS "cv_organisation_idx";
  DROP INDEX IF EXISTS "cv_created_by_idx";
  DROP INDEX IF EXISTS "cv_updated_by_idx";
  DROP INDEX IF EXISTS "skill_organisation_idx";
  DROP INDEX IF EXISTS "skill_created_by_idx";
  DROP INDEX IF EXISTS "skill_updated_by_idx";
  DROP INDEX IF EXISTS "level_organisation_idx";
  DROP INDEX IF EXISTS "level_created_by_idx";
  DROP INDEX IF EXISTS "level_updated_by_idx";
  DROP INDEX IF EXISTS "company_organisation_idx";
  DROP INDEX IF EXISTS "company_created_by_idx";
  DROP INDEX IF EXISTS "company_updated_by_idx";
  DROP INDEX IF EXISTS "project_organisation_idx";
  DROP INDEX IF EXISTS "project_created_by_idx";
  DROP INDEX IF EXISTS "project_updated_by_idx";
  DROP INDEX IF EXISTS "media_organisation_idx";
  DROP INDEX IF EXISTS "media_created_by_idx";
  DROP INDEX IF EXISTS "media_updated_by_idx";
  DROP INDEX IF EXISTS "organisations_created_by_idx";
  DROP INDEX IF EXISTS "organisations_updated_by_idx";
  DROP INDEX IF EXISTS "users_organisations_organisation_idx";
  DROP INDEX IF EXISTS "users_selected_organisation_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_cv_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_skill_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_skill_group_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_langs_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_level_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_company_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_project_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_media_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_organisations_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_users_id_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_users_id_idx";
  ALTER TABLE "skill" ADD COLUMN "name" varchar;
  ALTER TABLE "skill" ADD COLUMN "skill_type" "enum_skill_skill_type";
  ALTER TABLE "project" ADD COLUMN "name" varchar;
  DO $$ BEGIN
   ALTER TABLE "cv_languages" ADD CONSTRAINT "cv_languages_language_id_skill_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."skill"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_languages" ADD CONSTRAINT "cv_languages_level_id_level_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."level"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_languages" ADD CONSTRAINT "cv_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_technologies" ADD CONSTRAINT "cv_technologies_skill_id_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_technologies" ADD CONSTRAINT "cv_technologies_level_id_level_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."level"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_technologies" ADD CONSTRAINT "cv_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_soft_skills" ADD CONSTRAINT "cv_soft_skills_soft_skill_id_skill_id_fk" FOREIGN KEY ("soft_skill_id") REFERENCES "public"."skill"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_soft_skills" ADD CONSTRAINT "cv_soft_skills_level_id_level_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."level"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "cv_soft_skills" ADD CONSTRAINT "cv_soft_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "cv_languages_order_idx" ON "cv_languages" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cv_languages_parent_id_idx" ON "cv_languages" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cv_technologies_order_idx" ON "cv_technologies" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cv_technologies_parent_id_idx" ON "cv_technologies" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cv_soft_skills_order_idx" ON "cv_soft_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cv_soft_skills_parent_id_idx" ON "cv_soft_skills" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "skill_group_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "langs_id";`);
}
