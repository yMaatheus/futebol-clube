import Joi = require('joi');

export const userSchema = Joi.object({
  id: Joi.number().required(),
  username: Joi.string().required(),
  role: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default userSchema;
