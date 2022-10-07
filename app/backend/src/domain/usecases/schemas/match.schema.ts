import Joi = require('joi');

export const matchCreateSchema = Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().required(),
  homeTeamGoals: Joi.number().required(),
  awayTeamGoals: Joi.number().required(),
  inProgress: Joi.boolean(),
});

export const matchUpdateSchema = Joi.object({
  homeTeamGoals: Joi.number().required(),
  awayTeamGoals: Joi.number().required(),
});
