import { StatusCodes } from 'http-status-codes';
import AppError from './appError';

export const ID_INVALID = new AppError(StatusCodes.BAD_REQUEST, 'Id is invalid');

export const TEAM_NOT_FOUND = new AppError(StatusCodes.NOT_FOUND, 'Team not found');
