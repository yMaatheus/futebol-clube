import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/appError';
import Team from '../../database/models/team';
import { validateTeamId } from '../validations/team.validation';
import { ITeamRepository } from '../repositories/team.repository';

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

    if (!team) throw new AppError(StatusCodes.NOT_FOUND, 'Team not found');

    return team;
  }
}

export default TeamService;
