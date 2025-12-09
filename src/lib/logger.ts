import type { ILogObj } from 'tslog'

import { Logger } from 'tslog'

const dev: ILogObj = { minLevel: 5, type: 'pretty' }
const prod: ILogObj = { hideLogPositionForProduction: true, minLevel: 3, type: 'json' }

const logger: Logger<ILogObj> = new Logger(dev)

export { logger }
