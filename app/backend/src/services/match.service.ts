import Match from '../database/models/match';
import IMatchRepository from '../interfaces/IMatchRepository';
import MatchRepository from '../repositories/match.repository';

class MatchService {
  private matchRepository: IMatchRepository;

  constructor() {
    this.matchRepository = new MatchRepository();
  }

  getAll = async (inProgress: boolean | undefined): Promise<Match[]> => (
    inProgress == null
      ? this.matchRepository.getAll() : this.matchRepository.getAllByFilter(inProgress)
  );
}

export default new MatchService();
