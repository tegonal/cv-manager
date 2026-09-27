import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// The birthday of a CV and the end year of an education entry (ongoing studies) became optional.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cv_edu" ALTER COLUMN "to_year" DROP NOT NULL;
  ALTER TABLE "cv" ALTER COLUMN "birthday" DROP NOT NULL;`)
}

// Fails once records without these values exist
export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cv_edu" ALTER COLUMN "to_year" SET NOT NULL;
  ALTER TABLE "cv" ALTER COLUMN "birthday" SET NOT NULL;`)
}
