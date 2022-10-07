import IRequestCreateMatch from '../interfaces/IRequestCreateMatch';
import Team from '../../database/models/team';
import Match from '../../database/models/match';

export interface IMatchRepository {
  getAll(): Promise<Match[]>
  getAllByFilter(inProgress: boolean): Promise<Match[]>
  create(obj: IRequestCreateMatch): Promise<Match>
  getById(id: number): Promise<Match | null>
  getMatchesToLeaderboardHome(): Promise<Match[]>
  updateById(obj: object, id: number): Promise<void>
}

class MatchRepository implements IMatchRepository {
  private model = Match;

  async getAll(): Promise<Match[]> {
    return this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
  }

  async getAllByFilter(inProgress: boolean): Promise<Match[]> {
    return this.model.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
  }

  async create(
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }: IRequestCreateMatch,
  ): Promise<Match> {
    const match = await this.model.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: !!inProgress,
    });
    return match?.get();
  }

  async getById(id: number): Promise<Match | null> {
    const match = await this.model.findOne({ where: { id } });
    return match?.get();
  }

  async getMatchesToLeaderboardHome(): Promise<Match[]> {
    return this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome' },
      ],
    });
  }

  async updateById(obj: Match, id: number): Promise<void> {
    this.model.update(obj, { where: { id } });
  }
}

export default MatchRepository;
