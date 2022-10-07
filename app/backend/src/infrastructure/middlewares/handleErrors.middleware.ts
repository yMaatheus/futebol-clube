import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { getStatusCode } from 'http-status-codes';

const error: ErrorRequestHandler = async (err, _r: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;
  let code;

  try {
    code = getStatusCode(name);
  } catch (_error) {
    code = 500;
  }

  return res.status(code).json({ message });
};

export default error;
