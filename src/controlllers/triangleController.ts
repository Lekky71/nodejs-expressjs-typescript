import { IExpressRequest } from '../interfaces';
import { Response as ExpressResponse } from 'express';
import * as Response from '../helpers/response.manager';
import { Logger } from "../helpers/Logger";
import { triangleService } from "../services/triangleService";
import { HttpStatus } from "../constants/httpStatus";

export const triangleController = {
  /**
   * Get methods
   *
   * @param req
   * @param res
   */
  async receiveTriangle(req: IExpressRequest, res: ExpressResponse): Promise<void> {
    const { a, b, c } = req.body;
    Logger.Info(`Triangle Request: ${JSON.stringify(req.body)}`);
    //Check if params are valid numbers
    if (isNaN(a)) {
      return Response.failure(res, { message: 'Param a (number type) is required' }, HttpStatus.BAD_REQUEST);
    } else if (isNaN(b)) {
      return Response.failure(res, { message: 'Param b (number type) is required' }, HttpStatus.BAD_REQUEST);
    } else if (isNaN(c)) {
      return Response.failure(res, { message: 'Param c (number type) is required' }, HttpStatus.BAD_REQUEST);
    }
    triangleService.checkTriangle(Number(a), Number(b), Number(c))
      .then(response => {
        Logger.Info(response);
        return Response.success(res, {
          message: 'Triangle Check complete:',
          response
        }, HttpStatus.OK);
      });

  }
};
