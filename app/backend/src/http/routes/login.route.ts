import { Router } from 'express';
import authorization from '../middlewares/authorization.middleware';
import loginController from '../controllers/login.controller';

const route = Router();

route.post('/', loginController.authUser);
route.get('/validate', authorization, loginController.getUserRole);

export default route;
