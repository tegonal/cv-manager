import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cv_skill_highlights_locales" DROP CONSTRAINT "cv_skill_highlights_locales_locale_parent_id_unique";
  ALTER TABLE "cv_skill_groups_locales" DROP CONSTRAINT "cv_skill_groups_locales_locale_parent_id_unique";
  ALTER TABLE "cv_other_skills_locales" DROP CONSTRAINT "cv_other_skills_locales_locale_parent_id_unique";
  ALTER TABLE "cv_edu_highlights_locales" DROP CONSTRAINT "cv_edu_highlights_locales_locale_parent_id_unique";
  ALTER TABLE "cv_edu_locales" DROP CONSTRAINT "cv_edu_locales_locale_parent_id_unique";
  ALTER TABLE "cv_certs_locales" DROP CONSTRAINT "cv_certs_locales_locale_parent_id_unique";
  ALTER TABLE "cv_courses_locales" DROP CONSTRAINT "cv_courses_locales_locale_parent_id_unique";
  ALTER TABLE "cv_job_highlights_locales" DROP CONSTRAINT "cv_job_highlights_locales_locale_parent_id_unique";
  ALTER TABLE "cv_projects_locales" DROP CONSTRAINT "cv_projects_locales_locale_parent_id_unique";
  ALTER TABLE "cv_locales" DROP CONSTRAINT "cv_locales_locale_parent_id_unique";
  ALTER TABLE "skill_locales" DROP CONSTRAINT "skill_locales_locale_parent_id_unique";
  ALTER TABLE "skill_group_locales" DROP CONSTRAINT "skill_group_locales_locale_parent_id_unique";
  ALTER TABLE "langs_locales" DROP CONSTRAINT "langs_locales_locale_parent_id_unique";
  ALTER TABLE "level_locales" DROP CONSTRAINT "level_locales_locale_parent_id_unique";
  ALTER TABLE "project_locales" DROP CONSTRAINT "project_locales_locale_parent_id_unique";
  ALTER TABLE "cv_edu_highlights" ADD COLUMN "link" varchar;
  ALTER TABLE "cv_edu" ADD COLUMN "link" varchar;
  ALTER TABLE "cv_certs" ADD COLUMN "link" varchar;
  ALTER TABLE "cv_courses" ADD COLUMN "link" varchar;
  ALTER TABLE "project" ADD COLUMN "link" varchar;
  CREATE UNIQUE INDEX IF NOT EXISTS "cv_skill_highlights_locales_locale_parent_id_unique" ON "cv_skill_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cv_skill_groups_locales_locale_parent_id_unique" ON "cv_skill_groups_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cv_other_skills_locales_locale_parent_id_unique" ON "cv_other_skills_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cv_edu_highlights_locales_locale_parent_id_unique" ON "cv_edu_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cv_edu_locales_locale_parent_id_unique" ON "cv_edu_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cv_certs_locales_locale_parent_id_unique" ON "cv_certs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cv_courses_locales_locale_parent_id_unique" ON "cv_courses_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cv_job_highlights_locales_locale_parent_id_unique" ON "cv_job_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cv_projects_locales_locale_parent_id_unique" ON "cv_projects_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "cv_locales_locale_parent_id_unique" ON "cv_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "skill_locales_locale_parent_id_unique" ON "skill_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "skill_group_locales_locale_parent_id_unique" ON "skill_group_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "langs_locales_locale_parent_id_unique" ON "langs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "level_locales_locale_parent_id_unique" ON "level_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "project_locales_locale_parent_id_unique" ON "project_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "cv_skill_highlights_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "cv_skill_groups_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "cv_other_skills_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "cv_edu_highlights_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "cv_edu_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "cv_certs_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "cv_courses_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "cv_job_highlights_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "cv_projects_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "cv_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "skill_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "skill_group_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "langs_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "level_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "project_locales_locale_parent_id_unique";
  ALTER TABLE "cv_edu_highlights" DROP COLUMN IF EXISTS "link";
  ALTER TABLE "cv_edu" DROP COLUMN IF EXISTS "link";
  ALTER TABLE "cv_certs" DROP COLUMN IF EXISTS "link";
  ALTER TABLE "cv_courses" DROP COLUMN IF EXISTS "link";
  ALTER TABLE "project" DROP COLUMN IF EXISTS "link";
  ALTER TABLE "cv_skill_highlights_locales" ADD CONSTRAINT "cv_skill_highlights_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "cv_skill_groups_locales" ADD CONSTRAINT "cv_skill_groups_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "cv_other_skills_locales" ADD CONSTRAINT "cv_other_skills_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "cv_edu_highlights_locales" ADD CONSTRAINT "cv_edu_highlights_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "cv_edu_locales" ADD CONSTRAINT "cv_edu_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "cv_certs_locales" ADD CONSTRAINT "cv_certs_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "cv_courses_locales" ADD CONSTRAINT "cv_courses_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "cv_job_highlights_locales" ADD CONSTRAINT "cv_job_highlights_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "cv_projects_locales" ADD CONSTRAINT "cv_projects_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "cv_locales" ADD CONSTRAINT "cv_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "skill_locales" ADD CONSTRAINT "skill_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "skill_group_locales" ADD CONSTRAINT "skill_group_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "langs_locales" ADD CONSTRAINT "langs_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "level_locales" ADD CONSTRAINT "level_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");
  ALTER TABLE "project_locales" ADD CONSTRAINT "project_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id");`)
}
