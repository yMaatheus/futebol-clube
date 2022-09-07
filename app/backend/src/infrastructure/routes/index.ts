import { Router } from 'express';
import login from './login.route';
import team from './team.route';
import match from './match.route';
import leaderboard from './leaderboard.route';

const routes = Router();

routes.use('/login', login);
routes.use('/teams', team);
routes.use('/matches', match);
routes.use('/leaderboard', leaderboard);

export default routes;
