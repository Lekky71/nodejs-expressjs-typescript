import { Request } from 'express';

export interface IExpressRequest extends Request {
  userId?: string;
}
