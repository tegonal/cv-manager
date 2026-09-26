import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// Restores users.sub (the OAuth subject) for databases where 20251209_132605 dropped it before
// 4.1.0. Databases that ran the corrected 20251209_132605 still have the column, hence IF NOT EXISTS.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "sub" varchar;
  CREATE INDEX IF NOT EXISTS "users_sub_idx" ON "users" USING btree ("sub");`)
}

// No-op: the column may predate this migration, and dropping it would delete OAuth links.
export async function down(_args: MigrateDownArgs): Promise<void> {}
