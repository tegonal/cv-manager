import * as migration_20241008_105308 from './20241008_105308';
import * as migration_20241008_200824 from './20241008_200824';
import * as migration_20241009_083126 from './20241009_083126';
import * as migration_20241015_122932 from './20241015_122932';
import * as migration_20241016_070501 from './20241016_070501';
import * as migration_20241016_083631 from './20241016_083631';

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
  {
    up: migration_20241009_083126.up,
    down: migration_20241009_083126.down,
    name: '20241009_083126',
  },
  {
    up: migration_20241015_122932.up,
    down: migration_20241015_122932.down,
    name: '20241015_122932',
  },
  {
    up: migration_20241016_070501.up,
    down: migration_20241016_070501.down,
    name: '20241016_070501',
  },
  {
    up: migration_20241016_083631.up,
    down: migration_20241016_083631.down,
    name: '20241016_083631',
  },
];
