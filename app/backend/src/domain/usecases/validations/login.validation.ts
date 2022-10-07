import { INCORRECT_EMAIL_PASSWORD } from '../../errors/login.error';
import { ALL_FIELDS_NOT_FILLED } from '../../errors/appError';
import User from '../../../database/models/user';
import { loginSchema, userDatabseSchema } from '../schemas/login.schema';

export const validateEmailPassword = (body: object) => {
  const { error, value } = loginSchema.validate(body);

  if (error) throw ALL_FIELDS_NOT_FILLED;

  return value;
};

export const validateUser = (user: User | null) => {
  const { error } = userDatabseSchema.validate(user, { allowUnknown: true });

  if (error) throw INCORRECT_EMAIL_PASSWORD;

  return user as User;
};
