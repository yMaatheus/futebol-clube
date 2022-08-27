import { Router } from 'express';
import loginController from '../controllers/login.controller';
import authorizationMiddleware from '../middlewares/authorization.middleware';

const route = Router();

route.post('/', loginController.authUser);
route.get('/validate', authorizationMiddleware, loginController.getUserRole);

export default route;
