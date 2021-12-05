import express from 'express';
import { triangleController } from '../controlllers';
import { triangleValidator } from '../middlewares';

const router = express.Router();

router.post('/type', triangleValidator(), triangleController.receiveTriangle);

export default router;
