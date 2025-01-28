import * as migration_20250128_070303 from './20250128_070303';

export const migrations = [
  {
    up: migration_20250128_070303.up,
    down: migration_20250128_070303.down,
    name: '20250128_070303',
  },
];
