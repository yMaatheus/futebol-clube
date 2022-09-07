import { StatusCodes } from 'http-status-codes';
import AppError from '../../../utils/appError.util';
import Team from '../../../database/models/team';
import { validateTeamId } from './team.validation';
import teamRepository from '../../repositories/team.repository';

class TeamService {
  getAll = async (): Promise<Team[]> => {
    const teams = await Team.findAll();

    return teams;
  };

  getById = async (id: number): Promise<Team> => {
    validateTeamId(id);
    const team = await teamRepository.getById(id);

    if (!team) throw new AppError(StatusCodes.NOT_FOUND, 'Team not found');

    return team;
  };
}

export default new TeamService();
