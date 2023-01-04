import LeaderboardAway from '../entities/leaderboardAway.entity';
import LeaderboardHome from '../entities/leaderboardHome.entity';
import ITeamLeaderboardStatus from '../interfaces/ITeamLeaderboardStatus';
import { IMatchRepository } from '../repositories/match.repository';
import LeaderboardHomeAway from '../entities/leaderboardHomeAway.entity';

export interface ILeaderBoardSerice {
  getAllHome(): Promise<ITeamLeaderboardStatus[]>,
  getAllAway(): Promise<ITeamLeaderboardStatus[]>,
  getAll(): Promise<ITeamLeaderboardStatus[]>,
}

class LeaderboardService implements ILeaderBoardSerice {
  constructor(private matchRepository: IMatchRepository) {}

  async getAllHome(): Promise<ITeamLeaderboardStatus[]> {
    const leaderboard = new LeaderboardHome();

    const matches = await this.matchRepository.getMatchesToLeaderboardHome();

    matches.forEach((match) => {
      const teamRate = leaderboard.getOrCreateTeam(match);
      leaderboard.addTeamMatch(teamRate, match);
    });

    return leaderboard.getLeaderboard();
  }

  async getAllAway(): Promise<ITeamLeaderboardStatus[]> {
    const leaderboard = new LeaderboardAway();

    const matches = await this.matchRepository.getMatchesToLeaderboardAway();

    matches.forEach((match) => {
      const teamRate = leaderboard.getOrCreateTeam(match);
      leaderboard.addTeamMatch(teamRate, match);
    });

    return leaderboard.getLeaderboard();
  }

  async getAll(): Promise<ITeamLeaderboardStatus[]> {
    const leaderboard = new LeaderboardHomeAway();

    const matches = await this.matchRepository.getMatchesToLeaderboard();

    matches.forEach((match) => {
      const teams = leaderboard.getOrCreateTeam(match);
      leaderboard.addTeamMatch(teams, match);
    });

    return leaderboard.getLeaderboard();
  }
}

export default LeaderboardService;
