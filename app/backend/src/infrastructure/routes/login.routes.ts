import { Router } from 'express';
import UserRepository from '../../domain/repositories/user.repository';
import LoginService from '../../domain/usecases/login.service';
import LoginController from '../controllers/login.controller';
import authorizationMiddleware from '../middlewares/authorization.middleware';

const route = Router();

const userRepository = new UserRepository();
const loginService = new LoginService(userRepository);
const loginController = new LoginController(loginService);

route.post('/', loginController.auth);
route.get('/validate', authorizationMiddleware, loginController.getUserRole);

export default route;
