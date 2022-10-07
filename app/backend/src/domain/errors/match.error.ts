import { StatusCodes } from 'http-status-codes';
import AppError from './appError';

export const TEAMS_EQUAL = new AppError(
  StatusCodes.UNAUTHORIZED,
  'It is not possible to create a match with two equal teams',
);

export const ID_NOT_FILLED = new AppError(StatusCodes.BAD_REQUEST, 'Id must be filled');

export const MATCH_NOT_FOUND = new AppError(StatusCodes.NOT_FOUND, 'Match not found.');

export const ID_TEAM_NOT_EXISTS = new AppError(
  StatusCodes.NOT_FOUND,
  'There is no team with such id!',
);
