import log4js from 'log4js';
import {Log4js} from '../../../helpers/Logger/Log4js';
import {APP_NAME} from "../../../constants";

describe('Logger -> Log4js test suite', () => {
  let logger: Log4js;

  beforeEach(() => {
    console.log = jest.fn();

    log4js.configure = jest.fn();
    log4js.getLogger = jest.fn().mockReturnValue({
      info: console.log,
      warn: console.log,
      error: console.log,
    });

    logger = new Log4js({
      id: APP_NAME,
    });
  });

  it('Info logging', () => {
    const text = 'Information';

    logger.Info(text);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(text);
  });

  it('Warn logging', () => {
    const text = 'Warning';

    logger.Warn(text);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(text);
  });

  it('Error logging', () => {
    const text = 'Fatal Error';

    logger.Error(text);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(text);
  });
});
