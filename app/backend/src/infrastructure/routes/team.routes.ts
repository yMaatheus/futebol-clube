import { Router } from 'express';
import TeamRepository from '../../domain/repositories/team.repository';
import TeamService from '../../domain/usecases/team.service';
import TeamController from '../controllers/team.controller';

const route = Router();

const teamRepository = new TeamRepository();
const teamService = new TeamService(teamRepository);
const teamController = new TeamController(teamService);

route.get('/', teamController.getAll);
route.get('/:id', teamController.getById);

export default route;
