import { Router } from 'express';
import login from './login.route';
import team from './team.route';
import match from './match.route';

const routes = Router();

routes.use('/login', login);
routes.use('/teams', team);
routes.use('/matches', match);

export default routes;
