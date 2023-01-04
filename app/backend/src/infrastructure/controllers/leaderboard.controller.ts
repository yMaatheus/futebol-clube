import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ILeaderBoardSerice } from '../../domain/usecases/leaderboard.service';

class LeaderboardController {
  constructor(private service: ILeaderBoardSerice) {
    this.getAllHome = this.getAllHome.bind(this);
    this.getAllAway = this.getAllAway.bind(this);
  }

  async getAllHome(_req: Request, res: Response) {
    const leaderboard = await this.service.getAllHome();
    res.status(StatusCodes.OK).json(leaderboard);
  }

  async getAllAway(_req: Request, res: Response) {
    const leaderboard = await this.service.getAllAway();
    res.status(StatusCodes.OK).json(leaderboard);
  }
}

export default LeaderboardController;
