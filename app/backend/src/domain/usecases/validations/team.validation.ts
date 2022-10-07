import Joi = require('joi');
import { ID_INVALID } from '../../errors/team.error';

export const validateTeamId = (id: number) => {
  const schema = Joi.number().required();
  const { error } = schema.validate(id);

  if (error) throw ID_INVALID;

  return id;
};

export default validateTeamId;
