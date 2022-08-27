import * as dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { verify, sign, SignOptions, JwtPayload } from 'jsonwebtoken';
import AppError from '../utils/appError.util';

dotenv.config();

const SECRET = `${process.env.JWT_SECRET}`;

interface IUserJWT {
  id: number,
  username: string,
  role: string,
  email: string,
}

export const createJwtToken = (user: IUserJWT) => {
  const signInOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  const payload = {
    user,
  };

  const token = sign(payload, SECRET, signInOptions);
  return token;
};

export const verifyJwtToken = (token: string): JwtPayload => {
  try {
    const payload = verify(token, SECRET);

    return payload as JwtPayload;
  } catch (_err) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
  }
};
