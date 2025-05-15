import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`cv_edu_highlights\` ADD \`link\` text;`)
  await db.run(sql`ALTER TABLE \`cv_edu\` ADD \`link\` text;`)
  await db.run(sql`ALTER TABLE \`cv_certs\` ADD \`link\` text;`)
  await db.run(sql`ALTER TABLE \`cv_courses\` ADD \`link\` text;`)
  await db.run(sql`ALTER TABLE \`project\` ADD \`link\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`cv_edu_highlights\` DROP COLUMN \`link\`;`)
  await db.run(sql`ALTER TABLE \`cv_edu\` DROP COLUMN \`link\`;`)
  await db.run(sql`ALTER TABLE \`cv_certs\` DROP COLUMN \`link\`;`)
  await db.run(sql`ALTER TABLE \`cv_courses\` DROP COLUMN \`link\`;`)
  await db.run(sql`ALTER TABLE \`project\` DROP COLUMN \`link\`;`)
}
