import * as migration_20241008_105308 from './20241008_105308';
import * as migration_20241008_200824 from './20241008_200824';

export const migrations = [
  {
    up: migration_20241008_105308.up,
    down: migration_20241008_105308.down,
    name: '20241008_105308',
  },
  {
    up: migration_20241008_200824.up,
    down: migration_20241008_200824.down,
    name: '20241008_200824',
  },
];
