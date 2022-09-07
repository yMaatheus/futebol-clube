import * as bcrypt from 'bcryptjs';

export const encryptPassword = (password: string) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const checkPassword = (password: string, passwordHash: string) =>
  bcrypt.compareSync(password, passwordHash);
