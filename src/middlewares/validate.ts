import { AnyZodObject, z, ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ErrorMessageOptions, generateErrorMessage } from 'zod-error';

const validate =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body, query, params } = req;
                const object = {
                    body,
                    params,
                    query,
                };
                schema.parse(object);
                next();
            } catch (e: any) {
                res.status(400).json({
                    msg: 'Something went wrong on validation',
                    resaon: generateErrorMessage(e.issues),
                });
            }
        };

export { validate };
