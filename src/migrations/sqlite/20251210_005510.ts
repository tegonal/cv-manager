import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`company_info\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`address\` text,
  	\`city\` text,
  	\`url\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`pdf_style\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`logo_width\` numeric DEFAULT 30,
  	\`logo_position\` text DEFAULT 'right',
  	\`logo_display\` text DEFAULT 'allPages',
  	\`font_family\` text DEFAULT 'Rubik',
  	\`primary_color\` text DEFAULT '#64748b',
  	\`secondary_color\` text DEFAULT '#4d4d4d',
  	\`skill_level_display\` text DEFAULT 'text',
  	\`margin_top\` numeric DEFAULT 45,
  	\`margin_bottom\` numeric DEFAULT 15,
  	\`margin_left\` numeric DEFAULT 30,
  	\`margin_right\` numeric DEFAULT 30,
  	\`page_format\` text DEFAULT 'A4',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pdf_style_logo_idx\` ON \`pdf_style\` (\`logo_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`company_info\`;`)
  await db.run(sql`DROP TABLE \`pdf_style\`;`)
}
