import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE INDEX "cv_skill_highlights_locales_parent_id_idx" ON "cv_skill_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "cv_skill_groups_locales_parent_id_idx" ON "cv_skill_groups_locales" USING btree ("_parent_id");
  CREATE INDEX "cv_other_skills_locales_parent_id_idx" ON "cv_other_skills_locales" USING btree ("_parent_id");
  CREATE INDEX "cv_edu_highlights_locales_parent_id_idx" ON "cv_edu_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "cv_edu_locales_parent_id_idx" ON "cv_edu_locales" USING btree ("_parent_id");
  CREATE INDEX "cv_certs_locales_parent_id_idx" ON "cv_certs_locales" USING btree ("_parent_id");
  CREATE INDEX "cv_courses_locales_parent_id_idx" ON "cv_courses_locales" USING btree ("_parent_id");
  CREATE INDEX "cv_job_highlights_locales_parent_id_idx" ON "cv_job_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "cv_projects_locales_parent_id_idx" ON "cv_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "cv_locales_parent_id_idx" ON "cv_locales" USING btree ("_parent_id");
  CREATE INDEX "skill_locales_parent_id_idx" ON "skill_locales" USING btree ("_parent_id");
  CREATE INDEX "skill_group_locales_parent_id_idx" ON "skill_group_locales" USING btree ("_parent_id");
  CREATE INDEX "langs_locales_parent_id_idx" ON "langs_locales" USING btree ("_parent_id");
  CREATE INDEX "level_locales_parent_id_idx" ON "level_locales" USING btree ("_parent_id");
  CREATE INDEX "project_locales_parent_id_idx" ON "project_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "cv_skill_highlights_locales_parent_id_idx";
  DROP INDEX "cv_skill_groups_locales_parent_id_idx";
  DROP INDEX "cv_other_skills_locales_parent_id_idx";
  DROP INDEX "cv_edu_highlights_locales_parent_id_idx";
  DROP INDEX "cv_edu_locales_parent_id_idx";
  DROP INDEX "cv_certs_locales_parent_id_idx";
  DROP INDEX "cv_courses_locales_parent_id_idx";
  DROP INDEX "cv_job_highlights_locales_parent_id_idx";
  DROP INDEX "cv_projects_locales_parent_id_idx";
  DROP INDEX "cv_locales_parent_id_idx";
  DROP INDEX "skill_locales_parent_id_idx";
  DROP INDEX "skill_group_locales_parent_id_idx";
  DROP INDEX "langs_locales_parent_id_idx";
  DROP INDEX "level_locales_parent_id_idx";
  DROP INDEX "project_locales_parent_id_idx";`)
}
