import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyJwtToken } from '../../domain/providers/jwt.provider';
import AppError from '../../utils/appError.util';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) throw new AppError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');

  const { user } = verifyJwtToken(token);

  res.locals.user = user;

  next();
};
