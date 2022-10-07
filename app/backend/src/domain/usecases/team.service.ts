import Team from '../../database/models/team';
import { validateTeamId } from './validations/team.validation';
import { ITeamRepository } from '../repositories/team.repository';
import { TEAM_NOT_FOUND } from '../errors/team.error';

export interface ITeamService {
  getAll(): Promise<Team[]>
  getById(id: number): Promise<Team>
}

class TeamService {
  constructor(private teamRepository: ITeamRepository) {}

  async getAll(): Promise<Team[]> {
    return this.teamRepository.getAll();
  }

  async getById(id: number): Promise<Team> {
    validateTeamId(id);
    const team = await this.teamRepository.getById(id);

    if (!team) throw TEAM_NOT_FOUND;

    return team;
  }
}

export default TeamService;
