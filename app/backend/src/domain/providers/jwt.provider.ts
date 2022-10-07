import * as dotenv from 'dotenv';
import { verify, sign, SignOptions, JwtPayload } from 'jsonwebtoken';
import IUserJWT from '../interfaces/IUserJWT';
import { TOKEN_INVALID } from '../errors/token.error';

dotenv.config();

const SECRET = `${process.env.JWT_SECRET}`;
const options: SignOptions = { expiresIn: '15d', algorithm: 'HS256' };

class JwtProvider {
  constructor(private secret: string, private signOptions: SignOptions) {}

  signUser(user: IUserJWT): string {
    return this.sign({ user });
  }

  sign(payload: JwtPayload): string {
    return sign(payload, this.secret, this.signOptions);
  }

  verify(token: string): JwtPayload {
    try {
      return verify(token, this.secret, this.signOptions) as JwtPayload;
    } catch (_err) {
      throw TOKEN_INVALID;
    }
  }
}

export default new JwtProvider(SECRET, options);
