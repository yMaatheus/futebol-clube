import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LoginService } from '../services/login.service';

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public authUser = async (req: Request, res: Response) => {
    const token = await this.service.authUser(req.body);

    return res.status(StatusCodes.OK).json(token);
  };

  public getUserRole = async (_req: Request, res: Response) => {
    const { role } = res.locals.user;

    res.status(StatusCodes.OK).json({ role });
  };
}
