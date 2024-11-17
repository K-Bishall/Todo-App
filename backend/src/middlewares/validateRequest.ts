import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ErrorLocation, ValidationError } from '@/common/exceptions';

interface Schema {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}

function createError(error: ZodError, location: ErrorLocation): ValidationError {
  const fieldErrors: Record<string, string> = {};

  error.errors.forEach((issue) => {
    const key = issue.path.join('.');
    fieldErrors[key] = issue.message;
  });

  return new ValidationError(fieldErrors, location);
}

export function validateRequest({ body, query, params }: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (params) {
      const paramsResult = params.safeParse(req.params);

      if (!paramsResult.success) {
        return next(createError(paramsResult.error, 'params'));
      }

      req.params = paramsResult.data!;
    }

    if (body) {
      const bodyResult = body.safeParse(req.body);

      if (!bodyResult.success) {
        return next(createError(bodyResult.error, 'body'));
      }

      req.body = bodyResult.data!;
    }

    if (query) {
      const queryResult = query?.safeParse(req.query);

      if (queryResult && !queryResult.success) {
        return next(createError(queryResult.error, 'query'));
      }

      req.query = queryResult.data!;
    }

    next();
  };
}

export default validateRequest;
