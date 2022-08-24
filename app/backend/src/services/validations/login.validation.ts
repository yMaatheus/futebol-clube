import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import IUser from '../../interfaces/IUser';
import CustomError from '../../utils/customError.util';

export const validateEmailPassword = (body: object) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(body);

  if (error) throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled');

  return value;
};

type User = IUser | null;

export const validateUser = (user: User) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(user, { allowUnknown: true });

  if (error) throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

  return user as IUser;
};
