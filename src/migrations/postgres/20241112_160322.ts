import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE INDEX IF NOT EXISTS "cv_updated_at_idx" ON "cv" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "skill_updated_at_idx" ON "skill" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "skill_group_updated_at_idx" ON "skill_group" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "langs_updated_at_idx" ON "langs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "level_updated_at_idx" ON "level" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "company_updated_at_idx" ON "company" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "project_updated_at_idx" ON "project" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "organisations_updated_at_idx" ON "organisations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP INDEX IF EXISTS "cv_updated_at_idx";
  DROP INDEX IF EXISTS "skill_updated_at_idx";
  DROP INDEX IF EXISTS "skill_group_updated_at_idx";
  DROP INDEX IF EXISTS "langs_updated_at_idx";
  DROP INDEX IF EXISTS "level_updated_at_idx";
  DROP INDEX IF EXISTS "company_updated_at_idx";
  DROP INDEX IF EXISTS "project_updated_at_idx";
  DROP INDEX IF EXISTS "media_updated_at_idx";
  DROP INDEX IF EXISTS "organisations_updated_at_idx";
  DROP INDEX IF EXISTS "users_updated_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_updated_at_idx";
  DROP INDEX IF EXISTS "payload_preferences_updated_at_idx";
  DROP INDEX IF EXISTS "payload_migrations_updated_at_idx";`)
}
