/* istanbul ignore file */
import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ContextRunner } from 'express-validator/src/chain';
import { ErrorCode } from '../constants';

/**
 * Uniform handling of express validators
 * @param validations
 */
export const Validator = {
  validate: (validations: ContextRunner[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(validations.map((validation: ContextRunner) => validation.run(req)));

      const errors = validationResult(req);

      if (errors.isEmpty()) return next();

      res.status(400).json({
        code: ErrorCode.BAD_REQUEST,
        errors: errors.array().map(({ param, msg }) => ({
          param,
          message: msg,
        })),
      });
    };
  },
};

export const triangleValidator = () => {
  return Validator.validate([
    body('a', 'Param a (number type) is required')
      .isNumeric()
      .escape(),
    body('b', 'Param a (number type) is required')
      .isNumeric()
      .escape(),
    body('c', 'Param a (number type) is required')
      .isNumeric()
      .escape(),
  ]);
};
