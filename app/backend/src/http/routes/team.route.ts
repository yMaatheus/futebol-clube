import { Router } from 'express';
import teamController from '../controllers/team.controller';

const route = Router();

route.get('/', teamController.getAll);

export default route;
