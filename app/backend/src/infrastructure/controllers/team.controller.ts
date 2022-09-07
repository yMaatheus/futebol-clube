import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import teamService from '../../domain/usecases/team';

class TeamController {
  getAll = async (_req: Request, res: Response) => {
    const teams = await teamService.getAll();

    res.status(StatusCodes.OK).json(teams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await teamService.getById(+id);

    res.status(StatusCodes.OK).json(team);
  };
}

export default new TeamController();
