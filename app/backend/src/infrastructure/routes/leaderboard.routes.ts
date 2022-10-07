import { Router } from 'express';
import MatchRepository from '../../domain/repositories/match.repository';
import LeaderboardService from '../../domain/usecases/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';

const route = Router();

const matchRepository = new MatchRepository();
const leaderBoardService = new LeaderboardService(matchRepository);
const leaderBoardController = new LeaderboardController(leaderBoardService);

route.get('/home', leaderBoardController.getAllHome);

export default route;
