import { Router } from 'express';
import leaderboardController from '../controllers/leaderboard.controller';

const route = Router();

route.get('/home', leaderboardController.getAllHome);

export default route;
