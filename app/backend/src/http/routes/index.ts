import { Router } from 'express';
import login from './login.route';

const routes = Router();

routes.use('/login', login);

export default routes;
