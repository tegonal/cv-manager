import * as migration_20250128_070303 from './20250128_070303'
import * as migration_20250129_083144 from './20250129_083144'

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
]
