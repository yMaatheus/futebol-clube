import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ITeamService } from '../../domain/usecases/team.service';

class TeamController {
  constructor(private service: ITeamService) {
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getAll(_req: Request, res: Response) {
    const teams = await this.service.getAll();
    res.status(StatusCodes.OK).json(teams);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.service.getById(+id);

    res.status(StatusCodes.OK).json(team);
  }
}

export default TeamController;
