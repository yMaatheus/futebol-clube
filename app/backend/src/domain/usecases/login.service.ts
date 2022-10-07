import jwtProvider from '../providers/jwt.provider';
import { checkPassword } from '../providers/bcrypt.provider';
import IToken from '../interfaces/IToken';
import { validateEmailPassword, validateUser } from './validations/login.validation';
import { IUserRepository } from '../repositories/user.repository';
import { INCORRECT_EMAIL_PASSWORD } from '../errors/login.error';

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

    if (!user || !checkPassword(body.password, user.password)) throw INCORRECT_EMAIL_PASSWORD;

    const { id, username, role, email } = user;

    const token = jwtProvider.signUser({ id, username, role, email });

    return { token };
  }
}

export default LoginService;
