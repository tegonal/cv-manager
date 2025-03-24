import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`users\` ADD \`sub\` text;`)
  await db.run(sql`CREATE INDEX \`users_sub_idx\` ON \`users\` (\`sub\`);`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`prefix\` text DEFAULT 'media';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX IF EXISTS \`users_sub_idx\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`sub\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`prefix\`;`)
}
