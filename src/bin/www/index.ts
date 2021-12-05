/* istanbul ignore file */
import errorHandler from 'errorhandler';

import app from '../../app';
import { Logger } from '../../helpers/Logger';

app.use(errorHandler());

(async () => {
  // Initialize server
  const server = app.listen(process.env.APP_PORT || 8000, () => {
    const port = app.get('port');

    Logger.Info(`Auth Service Started at http://localhost:${port}`);
    Logger.Info('Press CTRL+C to stop\n');
  });

  // Nodemon dev hack
  process.once('SIGUSR2', function() {
    server.close(function() {
      process.kill(process.pid, 'SIGUSR2');
    });
  });
})();
