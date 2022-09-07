import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import AppError from '../../../utils/appError.util';
import User from '../../../database/models/user';

export const validateEmailPassword = (body: object) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(body);

  if (error) throw new AppError(StatusCodes.BAD_REQUEST, 'All fields must be filled');

  return value;
};

export const validateUser = (user: User | null) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(user, { allowUnknown: true });

  if (error) throw new AppError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

  return user as User;
};
