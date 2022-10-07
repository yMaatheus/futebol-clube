import { StatusCodes } from 'http-status-codes';
import AppError from './appError';

export const TOKEN_NOT_FOUND = new AppError(StatusCodes.UNAUTHORIZED, 'Token not found');

export const TOKEN_INVALID = new AppError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
