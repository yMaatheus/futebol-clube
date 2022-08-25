import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { getStatusCode } from 'http-status-codes';

const error: ErrorRequestHandler = async (err, _r: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;

  const code = getStatusCode(name);

  if (!code) return res.status(500).json({ message });

  return res.status(+code).json({ message });
};

export default error;
