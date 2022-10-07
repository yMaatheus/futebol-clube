import { StatusCodes } from 'http-status-codes';
import IRequestUpdateMatch from '../interfaces/IRequestUpdateMatch';
import AppError from '../errors/appError';
import IRequestCreateMatch from '../interfaces/IRequestCreateMatch';
import Match from '../../database/models/match';
import { validateMatchCreateBody,
  validateId, validateMatchUpdate } from '../validations/match.validation';
import { IMatchRepository } from '../repositories/match.repository';
import { ITeamRepository } from '../repositories/team.repository';

export interface IMatchService {
  getAll(inProgress: boolean | undefined): Promise<Match[]>
  create(body: IRequestCreateMatch): Promise<Match>
  finish(id: number): Promise<void>
  update(id: number, body: IRequestUpdateMatch): Promise<void>
}

class MatchService implements IMatchService {
  constructor(private matchRepository: IMatchRepository, private teamRepository: ITeamRepository) {}

  async getAll(inProgress: boolean | undefined): Promise<Match[]> {
    return (
      !inProgress ? this.matchRepository.getAll() : this.matchRepository.getAllByFilter(inProgress)
    );
  }

  async create(body: IRequestCreateMatch): Promise<Match> {
    const { homeTeam, awayTeam } = validateMatchCreateBody(body);

    const foundHomeTeam = await this.teamRepository.getById(homeTeam);
    const foundAwayTeam = await this.teamRepository.getById(awayTeam);

    if (!foundHomeTeam || !foundAwayTeam) {
      throw new AppError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }

    const match = await this.matchRepository.create(body);
    return match;
  }

  async finish(id: number) {
    validateId(id);
    await this.matchRepository.updateById({ inProgress: false }, id);
  }

  async update(id: number, body: IRequestUpdateMatch) {
    validateId(id);
    const { homeTeamGoals, awayTeamGoals } = validateMatchUpdate(body);
    const foundMatch = await this.matchRepository.getById(id);

    if (!foundMatch) throw new AppError(StatusCodes.NOT_FOUND, 'Match dont found.');

    await this.matchRepository.updateById({ homeTeamGoals, awayTeamGoals }, id);
  }
}

export default MatchService;
