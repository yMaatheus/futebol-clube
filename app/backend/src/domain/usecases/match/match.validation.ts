import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import IRequestUpdateMatch from '../../interfaces/IRequestUpdateMatch';
import IRequestCreateMatch from '../../interfaces/IRequestCreateMatch';
import AppError from '../../../utils/appError.util';

export const validateMatchCreateBody = (body: IRequestCreateMatch): IRequestCreateMatch => {
  const schema = Joi.object({
    homeTeam: Joi.number().required(),
    awayTeam: Joi.number().required(),
    homeTeamGoals: Joi.number().required(),
    awayTeamGoals: Joi.number().required(),
    inProgress: Joi.boolean(),
  });

  const { error } = schema.validate(body);

  if (error) throw new AppError(StatusCodes.BAD_REQUEST, 'All fields must be filled');

  if (body.homeTeam === body.awayTeam) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'It is not possible to create a match with two equal teams',
    );
  }

  return body;
};

export const validateId = (id: number): number => {
  const schema = Joi.number().required();
  const { error } = schema.validate(id);

  if (error) throw new AppError(StatusCodes.BAD_REQUEST, 'Id must be filled');

  return id;
};

export const validateMatchUpdate = (body: IRequestUpdateMatch): IRequestUpdateMatch => {
  const schema = Joi.object({
    homeTeamGoals: Joi.number().required(),
    awayTeamGoals: Joi.number().required(),
  });

  const { error } = schema.validate(body);

  if (error) throw new AppError(StatusCodes.BAD_REQUEST, 'All fields must be filled');

  return body;
};
