import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { getStatusCode } from 'http-status-codes';

const getCode = (name: string): number => {
  try {
    return getStatusCode(name);
  } catch (error) {
    return 500;
  }
};

const error: ErrorRequestHandler = async (err, _r: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;

  return res.status(getCode(name)).json({ message });
};

export default error;
