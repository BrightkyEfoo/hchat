import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';

config();

const private_key = process.env.PRIVATE_KEY;

if (!private_key)
  throw new Error('A key in environement is not defined : PRIVATE_KEY');

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader && !req.query.token) {
    const msg = 'Please generate a token first.';
    return res.status(401).json({ msg });
  }

  if (req.query.token && typeof req.query.token !== 'string') {
    const msg = 'Please generate a token first.';
    return res.status(401).json({ msg });
  }
  const token =
    req.query.token?.split(' ')[1] || authorizationHeader?.split(' ')[1] || '';

  jwt.verify(token, private_key, (error, decodedtoken) => {
    if (error) {
      const msg = 'User not authorized';
      console.error('jwt error', error);

      return res.status(401).json({ msg });
    }

    if (
      decodedtoken &&
      (decodedtoken as JwtPayload)?.appName !== 'ecommerce' &&
      decodedtoken &&
      (req.body.userId || req.query.userId || req.params.userId) &&
      req.body.userId &&
      req.body.userId !== (decodedtoken as JwtPayload)?.userId &&
      req.query.userId &&
      req.query.userId !== (decodedtoken as JwtPayload)?.userId &&
      req.params.userId &&
      req.params.userId !== (decodedtoken as JwtPayload)?.userId
    ) {
      return res.status(401).json({ msg: 'non autorise' });
    }

    (req as any).jwt = decodedtoken;

    next();
  });
};
