import { Router } from 'express';
import matchController from '../controllers/match.controller';

const route = Router();

route.get('/', matchController.getAll);

export default route;
