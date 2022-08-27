import IRequestCreateMatch from '../interfaces/IRequestCreateMatch';
import Match from '../database/models/match';
import IMatchRepository from '../interfaces/IMatchRepository';
import MatchRepository from '../repositories/match.repository';
import { validateMatchCreateBody, validateMatchFinish } from './validations/match.validation';

class MatchService {
  private matchRepository: IMatchRepository;

  constructor() {
    this.matchRepository = new MatchRepository();
  }

  getAll = async (inProgress: boolean | undefined): Promise<Match[]> => (
    inProgress == null
      ? this.matchRepository.getAll() : this.matchRepository.getAllByFilter(inProgress)
  );

  create = async (body: IRequestCreateMatch): Promise<Match> => {
    const { homeTeam, awayTeam, homeTeamGoals,
      awayTeamGoals, inProgress } = validateMatchCreateBody(body);

    const match = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: !!inProgress,
    });

    return match;
  };

  finish = async (id: number) => {
    validateMatchFinish(id);

    await Match.update({ inProgress: false }, { where: { id } });
  };
}

export default new MatchService();
