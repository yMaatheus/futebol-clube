import { Router } from 'express';
import TeamRepository from '../../domain/repositories/team.repository';
import MatchRepository from '../../domain/repositories/match.repository';
import MatchService from '../../domain/usecases/match.service';
import MatchController from '../controllers/match.controller';
import authorizationMiddleware from '../middlewares/authorization.middleware';

const route = Router();

const matchRepository = new MatchRepository();
const teamRepository = new TeamRepository();

const matchService = new MatchService(matchRepository, teamRepository);
const matchController = new MatchController(matchService);

route.route('/')
  .get(matchController.getAll)
  .post(authorizationMiddleware, matchController.create);

route.patch('/:id/finish', authorizationMiddleware, matchController.finish);

route.patch('/:id', authorizationMiddleware, matchController.update);

export default route;
