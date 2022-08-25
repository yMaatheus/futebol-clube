import { StatusCodes } from 'http-status-codes';
import { createJwtToken } from '../providers/jwt.provider';
import { checkPassword } from '../providers/password.provider';
import User from '../database/models/user';
import IToken from '../interfaces/IToken';
import CustomError from '../utils/customError.util';
import { validateEmailPassword, validateUser } from './validations/login.validation';

interface IRequestAuthUser {
  email: string,
  password: string,
}

interface ILoginService {
  authUser(body: IRequestAuthUser): Promise<IToken>
}

class LoginService implements ILoginService {
  authUser = async (body: IRequestAuthUser): Promise<IToken> => {
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

export default new LoginService();
