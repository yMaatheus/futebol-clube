import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import IRequestCreateMatch from '../../interfaces/IRequestCreateMatch';
import CustomError from '../../utils/customError.util';

export const validateMatchCreateBody = (body: IRequestCreateMatch): IRequestCreateMatch => {
  const schema = Joi.object({
    homeTeam: Joi.number().required(),
    awayTeam: Joi.number().required(),
    homeTeamGoals: Joi.number().required(),
    awayTeamGoals: Joi.number().required(),
    inProgress: Joi.boolean(),
  });

  const { error } = schema.validate(body);

  if (error) throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled');

  return body;
};

export default validateMatchCreateBody;
