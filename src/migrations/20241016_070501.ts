import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "cv_skill_highlights_locales" ALTER COLUMN "description" SET DATA TYPE jsonb USING to_jsonb(NULL::text);
  ALTER TABLE "cv_edu_highlights_locales" ALTER COLUMN "description" SET DATA TYPE jsonb USING to_jsonb(NULL::text);
  ALTER TABLE "cv_edu_locales" ALTER COLUMN "description" SET DATA TYPE jsonb USING to_jsonb(NULL::text);
  ALTER TABLE "cv_certs_locales" ALTER COLUMN "description" SET DATA TYPE jsonb USING to_jsonb(NULL::text);
  ALTER TABLE "cv_courses_locales" ALTER COLUMN "description" SET DATA TYPE jsonb USING to_jsonb(NULL::text);
  ALTER TABLE "cv_job_highlights_locales" ALTER COLUMN "description" SET DATA TYPE jsonb USING to_jsonb(NULL::text);
  ALTER TABLE "cv_projects_locales" ALTER COLUMN "description" SET DATA TYPE jsonb USING to_jsonb(NULL::text);`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "cv_skill_highlights_locales" ALTER COLUMN "description" SET DATA TYPE varchar;
  ALTER TABLE "cv_edu_highlights_locales" ALTER COLUMN "description" SET DATA TYPE varchar;
  ALTER TABLE "cv_edu_locales" ALTER COLUMN "description" SET DATA TYPE varchar;
  ALTER TABLE "cv_certs_locales" ALTER COLUMN "description" SET DATA TYPE varchar;
  ALTER TABLE "cv_courses_locales" ALTER COLUMN "description" SET DATA TYPE varchar;
  ALTER TABLE "cv_job_highlights_locales" ALTER COLUMN "description" SET DATA TYPE varchar;
  ALTER TABLE "cv_projects_locales" ALTER COLUMN "description" SET DATA TYPE varchar;`);
}
