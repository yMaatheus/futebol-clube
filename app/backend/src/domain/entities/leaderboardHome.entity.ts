import Match from '../../database/models/match';
import ITeamLeaderboardStatus from '../interfaces/ITeamLeaderboardStatus';
import Leaderboard from './leaderboard.entity';
import TeamRate from './teamRate.entity';

export default class LeaderboardHome extends Leaderboard {
  public getOrCreateTeam(match: Match): TeamRate {
    let teamRate = this.getTeam(match.teamHome.id);
    if (!teamRate) {
      teamRate = new TeamRate(match.teamHome.teamName, match.teamHome.id);
    }
    return teamRate;
  }

  public getLeaderboard(): ITeamLeaderboardStatus[] {
    return this.getTeamList()
      .map((team: TeamRate) => team.getStatus())
      .sort((b, a) => a.totalPoints - b.totalPoints
        || a.totalVictories - b.totalVictories
        || a.goalsBalance - b.goalsBalance
        || a.goalsFavor - b.goalsFavor
        || b.goalsOwn - a.goalsOwn);
  }
}
