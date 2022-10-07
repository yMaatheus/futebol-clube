import { StatusCodes } from 'http-status-codes';
import jwtProvider from '../providers/jwt.provider';
import { checkPassword } from '../providers/bcrypt.provider';
import IToken from '../interfaces/IToken';
import AppError from '../errors/appError';
import { validateEmailPassword, validateUser } from '../validations/login.validation';
import { IUserRepository } from '../repositories/user.repository';

interface IRequestAuthUser {
  email: string,
  password: string,
}

export interface ILoginService {
  authUser(body: IRequestAuthUser): Promise<IToken>
}

class LoginService implements ILoginService {
  constructor(private userRepository: IUserRepository) {}

  async authUser(body: IRequestAuthUser): Promise<IToken> {
    validateEmailPassword(body);
    const userDatabase = await this.userRepository.getByEmail(body.email);

    const user = validateUser(userDatabase);

    if (!user || !checkPassword(body.password, user.password)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const { id, username, role, email } = user;

    const token = jwtProvider.signUser({ id, username, role, email });

    return { token };
  }
}

export default LoginService;
