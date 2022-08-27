import { Router } from 'express';
import matchController from '../controllers/match.controller';
import authorizationMiddleware from '../middlewares/authorization.middleware';

const route = Router();

route.route('/')
  .get(matchController.getAll)
  .post(authorizationMiddleware, matchController.create);

export default route;
