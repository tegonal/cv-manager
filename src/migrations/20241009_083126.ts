import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "cv_skill_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill_id" integer NOT NULL,
  	"level_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cv_edu_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"from_year" timestamp(3) with time zone,
  	"to_year" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "cv_edu_highlights_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "cv_edu_highlights_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  CREATE TABLE IF NOT EXISTS "cv_job_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"company_id" integer NOT NULL,
  	"from_year" timestamp(3) with time zone,
  	"to_year" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "cv_job_highlights_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	CONSTRAINT "cv_job_highlights_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
  );
  
  ALTER TABLE "cv_projects" ALTER COLUMN "to_year" DROP NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "cv_skill_highlights" ADD CONSTRAINT "cv_skill_highlights_skill_id_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skill"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_skill_highlights" ADD CONSTRAINT "cv_skill_highlights_level_id_level_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."level"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_skill_highlights" ADD CONSTRAINT "cv_skill_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_edu_highlights" ADD CONSTRAINT "cv_edu_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_edu_highlights_locales" ADD CONSTRAINT "cv_edu_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv_edu_highlights"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_job_highlights" ADD CONSTRAINT "cv_job_highlights_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_job_highlights" ADD CONSTRAINT "cv_job_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cv_job_highlights_locales" ADD CONSTRAINT "cv_job_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cv_job_highlights"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "cv_skill_highlights_order_idx" ON "cv_skill_highlights" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cv_skill_highlights_parent_id_idx" ON "cv_skill_highlights" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cv_edu_highlights_order_idx" ON "cv_edu_highlights" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cv_edu_highlights_parent_id_idx" ON "cv_edu_highlights" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cv_job_highlights_order_idx" ON "cv_job_highlights" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cv_job_highlights_parent_id_idx" ON "cv_job_highlights" USING btree ("_parent_id");`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TYPE "_locales" ADD VALUE 'en';
  DROP TABLE "cv_skill_highlights";
  DROP TABLE "cv_edu_highlights";
  DROP TABLE "cv_edu_highlights_locales";
  DROP TABLE "cv_job_highlights";
  DROP TABLE "cv_job_highlights_locales";
  ALTER TABLE "cv_projects" ALTER COLUMN "to_year" SET NOT NULL;`);
}
