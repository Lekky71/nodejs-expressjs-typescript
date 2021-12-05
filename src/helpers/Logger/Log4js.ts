import log4js from 'log4js';
import {ILogger, ILoggerOptions} from '../../interfaces';

export class Log4js implements ILogger {
  logger: log4js.Logger;

  constructor(options: ILoggerOptions) {
    log4js.configure({
      appenders: {[options.id]: {type: 'console', layout: {type: 'basic'}}},
      categories: {default: {appenders: [options.id], level: options.level || 'error'}},
    });

    this.logger = log4js.getLogger(options.id);
  }

  Info(...info: any): void {
    this.logger.info(this.SerializeMessage(info));
  }

  Error(...error: any): void {
    this.logger.error(this.SerializeMessage(error));
  }

  Warn(...message: any): void {
    this.logger.warn(this.SerializeMessage(message));
  }

  private SerializeMessage(message: any[]): string {
    return message.map((m) => typeof m === 'object' ? JSON.stringify(m) : m).join(' ');
  }
}
