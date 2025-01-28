import {
  MigrateDownArgs,
  MigrateUpArgs,
} from '@payloadcms/db-mongodb'

export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {
  // Migration code
}

export async function down({ payload, req, session }: MigrateDownArgs): Promise<void> {
  // Migration code
}
