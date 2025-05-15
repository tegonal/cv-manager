import * as migration_20250128_070303 from './20250128_070303'
import * as migration_20250129_083144 from './20250129_083144'
import * as migration_20250515_093316 from './20250515_093316'

export const migrations = [
  {
    up: migration_20250128_070303.up,
    down: migration_20250128_070303.down,
    name: '20250128_070303',
  },
  {
    up: migration_20250129_083144.up,
    down: migration_20250129_083144.down,
    name: '20250129_083144',
  },
  {
    up: migration_20250515_093316.up,
    down: migration_20250515_093316.down,
    name: '20250515_093316',
  },
]
