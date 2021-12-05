import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

import ApiRoutes from './routes';

const isProduction: boolean = process.env.NODE_ENV === 'production';

dotenv.config();

const app = express();

app.set('port', process.env.APP_PORT);
app.set('env', process.env.NODE_ENV);

app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  compression({
    filter: (req: Request, res: Response) => {
      if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
      }
      // fallback to standard filter function
      return compression.filter(req, res);
    },
  }),
);

/**
 * Helmet for additional server security
 *  xssfilter, frameguard etc.
 *  https://www.npmjs.com/package/helmet
 */
app.use(helmet());

app.disable('x-powered-by');

app.use(methodOverride());

const router = express.Router();

router.use(ApiRoutes);

app.use(router);

// Force all requests on production to be served over https
app.use(function(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https' && isProduction) {
    const secureUrl = 'https://' + req.hostname + req.originalUrl;
    res.redirect(302, secureUrl);
  }

  next();
});

export default app;
