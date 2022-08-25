import { StatusCodes } from 'http-status-codes';
import CustomError from '../utils/customError.util';
import Team from '../database/models/team';

export interface ITeamService {
  getAll(): Promise<Team[]>
  getById(id: number): Promise<Team>
}

class TeamService implements ITeamService {
  getAll = async (): Promise<Team[]> => {
    const teams = await Team.findAll();

    return teams;
  };

  getById = async (id: number): Promise<Team> => {
    const team = await Team.findOne({ where: { id } });

    if (!team) throw new CustomError(StatusCodes.NOT_FOUND, 'Team not found');

    return team;
  };
}

export default new TeamService();
