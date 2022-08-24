import { Request, Response } from 'express';
import { LoginService } from '../services/login.service';

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public authUser = async (req: Request, res: Response) => {
    const token = await this.service.authUser(req.body);

    return res.status(200).json(token);
  };
}
