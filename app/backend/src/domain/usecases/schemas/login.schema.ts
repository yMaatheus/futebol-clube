import Joi = require('joi');

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userDatabseSchema = Joi.object({
  id: Joi.number().required(),
  username: Joi.string().required(),
  role: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
