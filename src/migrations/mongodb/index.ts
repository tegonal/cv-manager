import * as migration_20250128_074922_migration from './20250128_074922_migration';

export const migrations = [
  {
    up: migration_20250128_074922_migration.up,
    down: migration_20250128_074922_migration.down,
    name: '20250128_074922_migration',
  },
];
