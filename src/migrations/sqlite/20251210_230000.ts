import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pdf_style\` ADD \`logo_margin_top\` numeric DEFAULT 10;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` ADD \`logo_margin_left\` numeric DEFAULT 10;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` ADD \`logo_margin_right\` numeric DEFAULT 10;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` ADD \`first_page_margin_top\` numeric DEFAULT 45;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` ADD \`first_page_margin_bottom\` numeric DEFAULT 15;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` ADD \`first_page_margin_left\` numeric DEFAULT 30;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` ADD \`first_page_margin_right\` numeric DEFAULT 30;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` ADD \`first_page_layout\` text DEFAULT 'centered';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pdf_style\` DROP COLUMN \`logo_margin_top\`;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` DROP COLUMN \`logo_margin_left\`;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` DROP COLUMN \`logo_margin_right\`;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` DROP COLUMN \`first_page_margin_top\`;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` DROP COLUMN \`first_page_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` DROP COLUMN \`first_page_margin_left\`;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` DROP COLUMN \`first_page_margin_right\`;`)
  await db.run(sql`ALTER TABLE \`pdf_style\` DROP COLUMN \`first_page_layout\`;`)
}
