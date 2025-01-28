import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`cv_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`cv_links_order_idx\` ON \`cv_links\` (\`_order\`);`);
  await db.run(sql`CREATE INDEX \`cv_links_parent_id_idx\` ON \`cv_links\` (\`_parent_id\`);`);
  await db.run(sql`CREATE TABLE \`cv_lang\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`language_id\` integer NOT NULL,
  	\`level_id\` integer NOT NULL,
  	FOREIGN KEY (\`language_id\`) REFERENCES \`langs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`level_id\`) REFERENCES \`level\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`cv_lang_order_idx\` ON \`cv_lang\` (\`_order\`);`);
  await db.run(sql`CREATE INDEX \`cv_lang_parent_id_idx\` ON \`cv_lang\` (\`_parent_id\`);`);
  await db.run(sql`CREATE INDEX \`cv_lang_language_idx\` ON \`cv_lang\` (\`language_id\`);`);
  await db.run(sql`CREATE INDEX \`cv_lang_level_idx\` ON \`cv_lang\` (\`level_id\`);`);
  await db.run(sql`CREATE TABLE \`cv_skill_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`level_id\` integer,
  	FOREIGN KEY (\`level_id\`) REFERENCES \`level\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`cv_skill_highlights_order_idx\` ON \`cv_skill_highlights\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_skill_highlights_parent_id_idx\` ON \`cv_skill_highlights\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_skill_highlights_level_idx\` ON \`cv_skill_highlights\` (\`level_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_skill_highlights_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv_skill_highlights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`cv_skill_highlights_locales_locale_parent_id_unique\` ON \`cv_skill_highlights_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_skill_groups_skills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`level_id\` integer,
  	FOREIGN KEY (\`level_id\`) REFERENCES \`level\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv_skill_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`cv_skill_groups_skills_order_idx\` ON \`cv_skill_groups_skills\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_skill_groups_skills_parent_id_idx\` ON \`cv_skill_groups_skills\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_skill_groups_skills_level_idx\` ON \`cv_skill_groups_skills\` (\`level_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_skill_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group_id\` integer NOT NULL,
  	FOREIGN KEY (\`group_id\`) REFERENCES \`skill_group\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`cv_skill_groups_order_idx\` ON \`cv_skill_groups\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_skill_groups_parent_id_idx\` ON \`cv_skill_groups\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_skill_groups_group_idx\` ON \`cv_skill_groups\` (\`group_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_skill_groups_locales\` (
  	\`skill_group_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv_skill_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`cv_skill_groups_locales_locale_parent_id_unique\` ON \`cv_skill_groups_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_other_skills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`level_id\` integer,
  	FOREIGN KEY (\`level_id\`) REFERENCES \`level\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`cv_other_skills_order_idx\` ON \`cv_other_skills\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_other_skills_parent_id_idx\` ON \`cv_other_skills\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_other_skills_level_idx\` ON \`cv_other_skills\` (\`level_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_other_skills_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv_other_skills\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`cv_other_skills_locales_locale_parent_id_unique\` ON \`cv_other_skills_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_edu_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`from_year\` text,
  	\`to_year\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`cv_edu_highlights_order_idx\` ON \`cv_edu_highlights\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_edu_highlights_parent_id_idx\` ON \`cv_edu_highlights\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_edu_highlights_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv_edu_highlights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`cv_edu_highlights_locales_locale_parent_id_unique\` ON \`cv_edu_highlights_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_edu\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`from_year\` text NOT NULL,
  	\`to_year\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`cv_edu_order_idx\` ON \`cv_edu\` (\`_order\`);`);
  await db.run(sql`CREATE INDEX \`cv_edu_parent_id_idx\` ON \`cv_edu\` (\`_parent_id\`);`);
  await db.run(sql`CREATE TABLE \`cv_edu_locales\` (
  	\`institution\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv_edu\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`cv_edu_locales_locale_parent_id_unique\` ON \`cv_edu_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_certs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`to_year\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`cv_certs_order_idx\` ON \`cv_certs\` (\`_order\`);`);
  await db.run(sql`CREATE INDEX \`cv_certs_parent_id_idx\` ON \`cv_certs\` (\`_parent_id\`);`);
  await db.run(sql`CREATE TABLE \`cv_certs_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv_certs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`cv_certs_locales_locale_parent_id_unique\` ON \`cv_certs_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_courses\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`to_year\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`cv_courses_order_idx\` ON \`cv_courses\` (\`_order\`);`);
  await db.run(sql`CREATE INDEX \`cv_courses_parent_id_idx\` ON \`cv_courses\` (\`_parent_id\`);`);
  await db.run(sql`CREATE TABLE \`cv_courses_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv_courses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`cv_courses_locales_locale_parent_id_unique\` ON \`cv_courses_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_job_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`company_id\` integer NOT NULL,
  	\`from_year\` text,
  	\`to_year\` text,
  	FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`cv_job_highlights_order_idx\` ON \`cv_job_highlights\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_job_highlights_parent_id_idx\` ON \`cv_job_highlights\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`cv_job_highlights_company_idx\` ON \`cv_job_highlights\` (\`company_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_job_highlights_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv_job_highlights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`cv_job_highlights_locales_locale_parent_id_unique\` ON \`cv_job_highlights_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`company_id\` integer NOT NULL,
  	\`project_id\` integer NOT NULL,
  	\`from_year\` text NOT NULL,
  	\`to_year\` text,
  	FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`cv_projects_order_idx\` ON \`cv_projects\` (\`_order\`);`);
  await db.run(
    sql`CREATE INDEX \`cv_projects_parent_id_idx\` ON \`cv_projects\` (\`_parent_id\`);`,
  );
  await db.run(sql`CREATE INDEX \`cv_projects_company_idx\` ON \`cv_projects\` (\`company_id\`);`);
  await db.run(sql`CREATE INDEX \`cv_projects_project_idx\` ON \`cv_projects\` (\`project_id\`);`);
  await db.run(sql`CREATE TABLE \`cv_projects_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`cv_projects_locales_locale_parent_id_unique\` ON \`cv_projects_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`full_name\` text NOT NULL,
  	\`image_id\` integer,
  	\`birthday\` text NOT NULL,
  	\`nationality_status\` text,
  	\`phone_number\` text,
  	\`email\` text NOT NULL,
  	\`organisation_id\` integer,
  	\`created_by_id\` integer,
  	\`updated_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`organisation_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`updated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`cv_image_idx\` ON \`cv\` (\`image_id\`);`);
  await db.run(sql`CREATE INDEX \`cv_organisation_idx\` ON \`cv\` (\`organisation_id\`);`);
  await db.run(sql`CREATE INDEX \`cv_created_by_idx\` ON \`cv\` (\`created_by_id\`);`);
  await db.run(sql`CREATE INDEX \`cv_updated_by_idx\` ON \`cv\` (\`updated_by_id\`);`);
  await db.run(sql`CREATE INDEX \`cv_updated_at_idx\` ON \`cv\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`cv_created_at_idx\` ON \`cv\` (\`created_at\`);`);
  await db.run(sql`CREATE TABLE \`cv_locales\` (
  	\`introduction\` text,
  	\`casual_info\` text,
  	\`job_title\` text NOT NULL,
  	\`department\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`cv_locales_locale_parent_id_unique\` ON \`cv_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`cv_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`skill_id\` integer,
  	\`skill_group_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skill_id\`) REFERENCES \`skill\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skill_group_id\`) REFERENCES \`skill_group\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`cv_rels_order_idx\` ON \`cv_rels\` (\`order\`);`);
  await db.run(sql`CREATE INDEX \`cv_rels_parent_idx\` ON \`cv_rels\` (\`parent_id\`);`);
  await db.run(sql`CREATE INDEX \`cv_rels_path_idx\` ON \`cv_rels\` (\`path\`);`);
  await db.run(sql`CREATE INDEX \`cv_rels_skill_id_idx\` ON \`cv_rels\` (\`skill_id\`);`);
  await db.run(
    sql`CREATE INDEX \`cv_rels_skill_group_id_idx\` ON \`cv_rels\` (\`skill_group_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`);
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`);
  await db.run(sql`CREATE TABLE \`users_organisations_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users_organisations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`users_organisations_roles_order_idx\` ON \`users_organisations_roles\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`users_organisations_roles_parent_idx\` ON \`users_organisations_roles\` (\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`users_organisations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`organisation_id\` integer NOT NULL,
  	FOREIGN KEY (\`organisation_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`users_organisations_order_idx\` ON \`users_organisations\` (\`_order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`users_organisations_parent_id_idx\` ON \`users_organisations\` (\`_parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`users_organisations_organisation_idx\` ON \`users_organisations\` (\`organisation_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`first_name\` text,
  	\`last_name\` text,
  	\`selected_organisation_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text,
  	FOREIGN KEY (\`selected_organisation_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`users_selected_organisation_idx\` ON \`users\` (\`selected_organisation_id\`);`,
  );
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`);
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`);
  await db.run(sql`CREATE TABLE \`skill\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`organisation_id\` integer,
  	\`created_by_id\` integer,
  	\`updated_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`organisation_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`updated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`skill_organisation_idx\` ON \`skill\` (\`organisation_id\`);`);
  await db.run(sql`CREATE INDEX \`skill_created_by_idx\` ON \`skill\` (\`created_by_id\`);`);
  await db.run(sql`CREATE INDEX \`skill_updated_by_idx\` ON \`skill\` (\`updated_by_id\`);`);
  await db.run(sql`CREATE INDEX \`skill_updated_at_idx\` ON \`skill\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`skill_created_at_idx\` ON \`skill\` (\`created_at\`);`);
  await db.run(sql`CREATE TABLE \`skill_locales\` (
  	\`name\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`skill\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`skill_locales_locale_parent_id_unique\` ON \`skill_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`skill_group\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`organisation_id\` integer,
  	\`created_by_id\` integer,
  	\`updated_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`organisation_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`updated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`skill_group_organisation_idx\` ON \`skill_group\` (\`organisation_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`skill_group_created_by_idx\` ON \`skill_group\` (\`created_by_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`skill_group_updated_by_idx\` ON \`skill_group\` (\`updated_by_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`skill_group_updated_at_idx\` ON \`skill_group\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`skill_group_created_at_idx\` ON \`skill_group\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`skill_group_locales\` (
  	\`name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`skill_group\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`skill_group_locales_locale_parent_id_unique\` ON \`skill_group_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`langs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`organisation_id\` integer,
  	\`created_by_id\` integer,
  	\`updated_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`organisation_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`updated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`langs_organisation_idx\` ON \`langs\` (\`organisation_id\`);`);
  await db.run(sql`CREATE INDEX \`langs_created_by_idx\` ON \`langs\` (\`created_by_id\`);`);
  await db.run(sql`CREATE INDEX \`langs_updated_by_idx\` ON \`langs\` (\`updated_by_id\`);`);
  await db.run(sql`CREATE INDEX \`langs_updated_at_idx\` ON \`langs\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`langs_created_at_idx\` ON \`langs\` (\`created_at\`);`);
  await db.run(sql`CREATE TABLE \`langs_locales\` (
  	\`name\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`langs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`langs_locales_locale_parent_id_unique\` ON \`langs_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`level_level_type\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`level\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`level_level_type_order_idx\` ON \`level_level_type\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`level_level_type_parent_idx\` ON \`level_level_type\` (\`parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`level\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`points\` numeric,
  	\`organisation_id\` integer,
  	\`created_by_id\` integer,
  	\`updated_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`organisation_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`updated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`level_organisation_idx\` ON \`level\` (\`organisation_id\`);`);
  await db.run(sql`CREATE INDEX \`level_created_by_idx\` ON \`level\` (\`created_by_id\`);`);
  await db.run(sql`CREATE INDEX \`level_updated_by_idx\` ON \`level\` (\`updated_by_id\`);`);
  await db.run(sql`CREATE INDEX \`level_updated_at_idx\` ON \`level\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`level_created_at_idx\` ON \`level\` (\`created_at\`);`);
  await db.run(sql`CREATE TABLE \`level_locales\` (
  	\`level\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`level\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`level_locales_locale_parent_id_unique\` ON \`level_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`company\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`organisation_id\` integer,
  	\`created_by_id\` integer,
  	\`updated_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`organisation_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`updated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`company_organisation_idx\` ON \`company\` (\`organisation_id\`);`,
  );
  await db.run(sql`CREATE INDEX \`company_created_by_idx\` ON \`company\` (\`created_by_id\`);`);
  await db.run(sql`CREATE INDEX \`company_updated_by_idx\` ON \`company\` (\`updated_by_id\`);`);
  await db.run(sql`CREATE INDEX \`company_updated_at_idx\` ON \`company\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`company_created_at_idx\` ON \`company\` (\`created_at\`);`);
  await db.run(sql`CREATE TABLE \`project\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`organisation_id\` integer,
  	\`created_by_id\` integer,
  	\`updated_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`organisation_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`updated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`project_organisation_idx\` ON \`project\` (\`organisation_id\`);`,
  );
  await db.run(sql`CREATE INDEX \`project_created_by_idx\` ON \`project\` (\`created_by_id\`);`);
  await db.run(sql`CREATE INDEX \`project_updated_by_idx\` ON \`project\` (\`updated_by_id\`);`);
  await db.run(sql`CREATE INDEX \`project_updated_at_idx\` ON \`project\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`project_created_at_idx\` ON \`project\` (\`created_at\`);`);
  await db.run(sql`CREATE TABLE \`project_locales\` (
  	\`name\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE UNIQUE INDEX \`project_locales_locale_parent_id_unique\` ON \`project_locales\` (\`_locale\`,\`_parent_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`organisation_id\` integer,
  	\`created_by_id\` integer,
  	\`updated_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_tablet_url\` text,
  	\`sizes_tablet_width\` numeric,
  	\`sizes_tablet_height\` numeric,
  	\`sizes_tablet_mime_type\` text,
  	\`sizes_tablet_filesize\` numeric,
  	\`sizes_tablet_filename\` text,
  	FOREIGN KEY (\`organisation_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`updated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`media_organisation_idx\` ON \`media\` (\`organisation_id\`);`);
  await db.run(sql`CREATE INDEX \`media_created_by_idx\` ON \`media\` (\`created_by_id\`);`);
  await db.run(sql`CREATE INDEX \`media_updated_by_idx\` ON \`media\` (\`updated_by_id\`);`);
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`);
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`);
  await db.run(
    sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`media_sizes_tablet_sizes_tablet_filename_idx\` ON \`media\` (\`sizes_tablet_filename\`);`,
  );
  await db.run(sql`CREATE TABLE \`organisations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`created_by_id\` integer,
  	\`updated_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`updated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(
    sql`CREATE INDEX \`organisations_created_by_idx\` ON \`organisations\` (\`created_by_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`organisations_updated_by_idx\` ON \`organisations\` (\`updated_by_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`organisations_updated_at_idx\` ON \`organisations\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`organisations_created_at_idx\` ON \`organisations\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`cv_id\` integer,
  	\`users_id\` integer,
  	\`skill_id\` integer,
  	\`skill_group_id\` integer,
  	\`langs_id\` integer,
  	\`level_id\` integer,
  	\`company_id\` integer,
  	\`project_id\` integer,
  	\`media_id\` integer,
  	\`organisations_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cv_id\`) REFERENCES \`cv\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skill_id\`) REFERENCES \`skill\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skill_group_id\`) REFERENCES \`skill_group\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`langs_id\`) REFERENCES \`langs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`level_id\`) REFERENCES \`level\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`organisations_id\`) REFERENCES \`organisations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_cv_id_idx\` ON \`payload_locked_documents_rels\` (\`cv_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_skill_id_idx\` ON \`payload_locked_documents_rels\` (\`skill_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_skill_group_id_idx\` ON \`payload_locked_documents_rels\` (\`skill_group_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_langs_id_idx\` ON \`payload_locked_documents_rels\` (\`langs_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_level_id_idx\` ON \`payload_locked_documents_rels\` (\`level_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_company_id_idx\` ON \`payload_locked_documents_rels\` (\`company_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_project_id_idx\` ON \`payload_locked_documents_rels\` (\`project_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_organisations_id_idx\` ON \`payload_locked_documents_rels\` (\`organisations_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`,
  );
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `);
  await db.run(
    sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`,
  );
  await db.run(
    sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`,
  );
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`cv_links\`;`);
  await db.run(sql`DROP TABLE \`cv_lang\`;`);
  await db.run(sql`DROP TABLE \`cv_skill_highlights\`;`);
  await db.run(sql`DROP TABLE \`cv_skill_highlights_locales\`;`);
  await db.run(sql`DROP TABLE \`cv_skill_groups_skills\`;`);
  await db.run(sql`DROP TABLE \`cv_skill_groups\`;`);
  await db.run(sql`DROP TABLE \`cv_skill_groups_locales\`;`);
  await db.run(sql`DROP TABLE \`cv_other_skills\`;`);
  await db.run(sql`DROP TABLE \`cv_other_skills_locales\`;`);
  await db.run(sql`DROP TABLE \`cv_edu_highlights\`;`);
  await db.run(sql`DROP TABLE \`cv_edu_highlights_locales\`;`);
  await db.run(sql`DROP TABLE \`cv_edu\`;`);
  await db.run(sql`DROP TABLE \`cv_edu_locales\`;`);
  await db.run(sql`DROP TABLE \`cv_certs\`;`);
  await db.run(sql`DROP TABLE \`cv_certs_locales\`;`);
  await db.run(sql`DROP TABLE \`cv_courses\`;`);
  await db.run(sql`DROP TABLE \`cv_courses_locales\`;`);
  await db.run(sql`DROP TABLE \`cv_job_highlights\`;`);
  await db.run(sql`DROP TABLE \`cv_job_highlights_locales\`;`);
  await db.run(sql`DROP TABLE \`cv_projects\`;`);
  await db.run(sql`DROP TABLE \`cv_projects_locales\`;`);
  await db.run(sql`DROP TABLE \`cv\`;`);
  await db.run(sql`DROP TABLE \`cv_locales\`;`);
  await db.run(sql`DROP TABLE \`cv_rels\`;`);
  await db.run(sql`DROP TABLE \`users_roles\`;`);
  await db.run(sql`DROP TABLE \`users_organisations_roles\`;`);
  await db.run(sql`DROP TABLE \`users_organisations\`;`);
  await db.run(sql`DROP TABLE \`users\`;`);
  await db.run(sql`DROP TABLE \`skill\`;`);
  await db.run(sql`DROP TABLE \`skill_locales\`;`);
  await db.run(sql`DROP TABLE \`skill_group\`;`);
  await db.run(sql`DROP TABLE \`skill_group_locales\`;`);
  await db.run(sql`DROP TABLE \`langs\`;`);
  await db.run(sql`DROP TABLE \`langs_locales\`;`);
  await db.run(sql`DROP TABLE \`level_level_type\`;`);
  await db.run(sql`DROP TABLE \`level\`;`);
  await db.run(sql`DROP TABLE \`level_locales\`;`);
  await db.run(sql`DROP TABLE \`company\`;`);
  await db.run(sql`DROP TABLE \`project\`;`);
  await db.run(sql`DROP TABLE \`project_locales\`;`);
  await db.run(sql`DROP TABLE \`media\`;`);
  await db.run(sql`DROP TABLE \`organisations\`;`);
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`);
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`);
  await db.run(sql`DROP TABLE \`payload_preferences\`;`);
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`);
  await db.run(sql`DROP TABLE \`payload_migrations\`;`);
}
