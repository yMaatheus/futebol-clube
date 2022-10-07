import { NextFunction, Request, Response } from 'express';
import { TOKEN_NOT_FOUND } from '../../domain/errors/token.error';
import jwtProvider from '../../domain/providers/jwt.provider';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) throw TOKEN_NOT_FOUND;

  const { user } = jwtProvider.verify(token);

  res.locals.user = user;

  next();
};
