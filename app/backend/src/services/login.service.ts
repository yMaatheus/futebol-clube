import { StatusCodes } from 'http-status-codes';
import { createJwtToken } from '../utils/jwt.util';
import { checkPassword } from '../utils/password.util';
import User from '../database/models/user';
import IToken from '../interfaces/IToken';
import CustomError from '../utils/customError.util';
import { validateEmailPassword, validateUser } from './validations/login.validation';

export type bodyAuthUser = {
  email: string,
  password: string,
};

export interface ILoginService {
  authUser(body: bodyAuthUser): Promise<IToken>
}

export class LoginService implements ILoginService {
  authUser = async (body: bodyAuthUser): Promise<IToken> => {
    validateEmailPassword(body);
    const userDatabase = await User.findOne({ where: { email: body.email } });

    const user = validateUser(userDatabase);

    if (!checkPassword(body.password, user.password)) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const { id, username, role, email } = user;

    const token = createJwtToken({ id, username, role, email });

    return { token };
  };
}
