import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/appError.util';
import IRequestCreateMatch from '../interfaces/IRequestCreateMatch';
import Match from '../database/models/match';
import matchRepository from '../repositories/match.repository';
import { validateMatchCreateBody, validateMatchFinish } from './validations/match.validation';
import teamRepository from '../repositories/team.repository';

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

    const match = matchRepository.create(body);
    return match;
  };

  finish = async (id: number) => {
    validateMatchFinish(id);

    await Match.update({ inProgress: false }, { where: { id } });
  };
}

export default new MatchService();
