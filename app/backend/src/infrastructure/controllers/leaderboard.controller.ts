import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import leaderboardService from '../../domain/usecases/leaderboard';

class LeaderboardController {
  getAllHome = async (_req: Request, res: Response) => {
    const leaderboard = await leaderboardService.getAllHome();
    res.status(StatusCodes.OK).json(leaderboard);
  };
}

export default new LeaderboardController();
