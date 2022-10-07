import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILoginService } from '../../domain/usecases/login.service';

class LoginController {
  constructor(private service: ILoginService) {
    this.auth = this.auth.bind(this);
  }

  async auth(req: Request, res: Response) {
    const token = await this.service.authUser(req.body);

    return res.status(StatusCodes.OK).json(token);
  }

  getUserRole = async (_req: Request, res: Response) => {
    const { role } = res.locals.user;

    return res.status(StatusCodes.OK).json({ role });
  };
}

export default LoginController;
