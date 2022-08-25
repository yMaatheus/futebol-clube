import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import loginService from '../../services/login.service';

class LoginController {
  public authUser = async (req: Request, res: Response) => {
    const token = await loginService.authUser(req.body);

    return res.status(StatusCodes.OK).json(token);
  };

  public getUserRole = async (_req: Request, res: Response) => {
    const { role } = res.locals.user;

    res.status(StatusCodes.OK).json({ role });
  };
}

export default new LoginController();
