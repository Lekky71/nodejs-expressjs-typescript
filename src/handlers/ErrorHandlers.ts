import { Request, Response } from 'express';

/**
 * Handles undefined route errors
 * @param req Express request
 * @param res Express response
 */
export async function routeError(req: Request, res: Response): Promise<Response> {
  return res.status(404).json({
    errors: {
      message: 'Invalid route. See documentation.',
      error: {
        status: 404,
      },
    },
  });
}
