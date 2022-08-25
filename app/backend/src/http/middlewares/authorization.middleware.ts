import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyJwtToken } from '../../providers/jwt.provider';
import CustomError from '../../utils/customError.util';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  if (!token) throw new CustomError(StatusCodes.UNAUTHORIZED, 'Authorization code not informed');

  const { user } = verifyJwtToken(token);

  res.locals.user = user;

  next();
};
