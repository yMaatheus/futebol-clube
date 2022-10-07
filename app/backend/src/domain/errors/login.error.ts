import { StatusCodes } from 'http-status-codes';
import AppError from './appError';

export const INCORRECT_EMAIL_PASSWORD = (
  new AppError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password')
);

export default INCORRECT_EMAIL_PASSWORD;
