import express from 'express';
import {routeError} from '../handlers';

import triangleRoutes from './triangle';

const router: express.Router = express.Router();

router.use('/triangle', triangleRoutes);

router.use('/health', (req, res) => {
  res.send({ status: 'OK' });
});

router.use(routeError);

export default router;
