import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import teamService from '../../services/team.service';

class TeamController {
  getAll = async (_req: Request, res: Response) => {
    const teams = await teamService.getAll();

    res.status(StatusCodes.OK).json(teams);
  };
}

export default new TeamController();
