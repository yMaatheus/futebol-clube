import IRequestCreateMatch from '../interfaces/IRequestCreateMatch';
import Team from '../database/models/team';
import Match from '../database/models/match';
import IMatchRepository from '../interfaces/IMatchRepository';

class MatchRepository implements IMatchRepository {
  getAll = async (): Promise<Match[]> => Match.findAll({
    include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  getAllByFilter = async (inProgress: boolean): Promise<Match[]> => Match.findAll({
    where: { inProgress },
    include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  create = async (
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }: IRequestCreateMatch,
  ): Promise<Match> => {
    const match = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: !!inProgress,
    });

    return match;
  };

  getById = async (id: number): Promise<Match | null> => Match.findOne({ where: { id } });
}

export default new MatchRepository();
