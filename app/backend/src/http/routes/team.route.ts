import { Router } from 'express';
import teamController from '../controllers/team.controller';

const route = Router();

route.get('/', teamController.getAll);
route.get('/:id', teamController.getById);

export default route;
