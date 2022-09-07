import { StatusCodes } from 'http-status-codes';
import IRequestUpdateMatch from '../../interfaces/IRequestUpdateMatch';
import AppError from '../../../utils/appError.util';
import IRequestCreateMatch from '../../interfaces/IRequestCreateMatch';
import Match from '../../../database/models/match';
import matchRepository from '../../repositories/match.repository';
import { validateMatchCreateBody, validateId, validateMatchUpdate } from './match.validation';
import teamRepository from '../../repositories/team.repository';

class MatchService {
  getAll = async (inProgress: boolean | undefined): Promise<Match[]> => (
    inProgress == null ? matchRepository.getAll() : matchRepository.getAllByFilter(inProgress)
  );

  create = async (body: IRequestCreateMatch): Promise<Match> => {
    const { homeTeam, awayTeam } = validateMatchCreateBody(body);

    const foundHomeTeam = await teamRepository.getById(homeTeam);
    const foundAwayTeam = await teamRepository.getById(awayTeam);

    if (!foundHomeTeam || !foundAwayTeam) {
      throw new AppError(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }

    const match = await matchRepository.create(body);
    return match;
  };

  finish = async (id: number) => {
    validateId(id);

    await Match.update({ inProgress: false }, { where: { id } });
  };

  update = async (id: number, body: IRequestUpdateMatch) => {
    validateId(id);
    const { homeTeamGoals, awayTeamGoals } = validateMatchUpdate(body);
    const foundMatch = await matchRepository.getById(id);

    if (!foundMatch) throw new AppError(StatusCodes.NOT_FOUND, 'Match dont found.');

    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}

export default new MatchService();
