import { Router } from 'express';
import matchController from '../controllers/match.controller';

const route = Router();

route.route('/')
  .get(matchController.getAll)
  .post(matchController.create);

export default route;
