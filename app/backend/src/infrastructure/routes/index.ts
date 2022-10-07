import { Router } from 'express';
import login from './login.routes';
import team from './team.routes';
import match from './match.routes';
import leaderboard from './leaderboard.routes';

const routes = Router();

routes.use('/login', login);
routes.use('/teams', team);
routes.use('/matches', match);
routes.use('/leaderboard', leaderboard);

export default routes;
