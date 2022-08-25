import { Router } from 'express';
import login from './login.route';
import team from './team.route';

const routes = Router();

routes.use('/login', login);
routes.use('/teams', team);

export default routes;
