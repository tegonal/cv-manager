import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';

const dev: ILogObj = { type: 'pretty', minLevel: 3 };
const prod: ILogObj = { type: 'pretty', minLevel: 3, hideLogPositionForProduction: true };

const logger: Logger<ILogObj> = new Logger(dev);

export { logger };
