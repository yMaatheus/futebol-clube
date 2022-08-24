import { Router } from 'express';
import authorization from '../middlewares/authorization.middleware';
import LoginController from '../controllers/login.controller';

const route = Router();

const loginController = new LoginController();

route.post('/', loginController.authUser);
route.get('/validate', authorization);

export default route;
