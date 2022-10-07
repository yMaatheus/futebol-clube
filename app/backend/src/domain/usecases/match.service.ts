import Joi = require('joi');
import { ID_NOT_FILLED, ID_TEAM_NOT_EXISTS, MATCH_NOT_FOUND } from '../errors/match.error';
import IRequestUpdateMatch from '../interfaces/IRequestUpdateMatch';
import IRequestCreateMatch from '../interfaces/IRequestCreateMatch';
import Match from '../../database/models/match';
import { validateMatchCreate, validateMatchUpdate } from './validations/match.validation';
import { IMatchRepository } from '../repositories/match.repository';
import { ITeamRepository } from '../repositories/team.repository';

export interface IMatchService {
  getAll(inProgress: boolean | undefined): Promise<Match[]>
  create(body: IRequestCreateMatch): Promise<Match>
  update(id: number, body: IRequestUpdateMatch): Promise<void>
  updateById(body: object, id: number): Promise<void>
}

const validateId = (id: number): number => {
  const schema = Joi.number().required();
  const { error } = schema.validate(id);

  if (error) throw ID_NOT_FILLED;

  return id;
};

class MatchService implements IMatchService {
  constructor(private matchRepository: IMatchRepository, private teamRepository: ITeamRepository) {}

  async getAll(inProgress: boolean | undefined): Promise<Match[]> {
    return (
      !inProgress ? this.matchRepository.getAll() : this.matchRepository.getAllByFilter(inProgress)
    );
  }

  async create(body: IRequestCreateMatch): Promise<Match> {
    const { homeTeam, awayTeam } = validateMatchCreate(body);

    const foundHomeTeam = await this.teamRepository.getById(homeTeam);
    const foundAwayTeam = await this.teamRepository.getById(awayTeam);

    if (!foundHomeTeam || !foundAwayTeam) throw ID_TEAM_NOT_EXISTS;

    const match = await this.matchRepository.create(body);
    return match;
  }

  async update(id: number, body: IRequestUpdateMatch) {
    const { homeTeamGoals, awayTeamGoals } = validateMatchUpdate(body);

    await this.updateById({ homeTeamGoals, awayTeamGoals }, id);
  }

  async updateById(body: object, id: number) {
    validateId(id);
    const foundMatch = await this.matchRepository.getById(id);

    if (!foundMatch) throw MATCH_NOT_FOUND;

    await this.matchRepository.updateById(body, id);
  }
}

export default MatchService;
