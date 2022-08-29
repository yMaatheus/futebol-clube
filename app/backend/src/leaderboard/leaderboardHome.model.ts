import Match from '../database/models/match';
import ITeamLeaderboardStatus from '../interfaces/ITeamLeaderboardStatus';
import Leaderboard from './leaderboard.model';
import TeamRate from './teamRate.model';

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
      .sort((b, a) => b.goalsOwn - a.goalsOwn)
      .sort((b, a) => a.goalsFavor - b.goalsFavor)
      .sort((b, a) => a.goalsBalance - b.goalsBalance)
      .sort((b, a) => a.totalVictories - b.totalVictories)
      .sort((b, a) => a.totalPoints - b.totalPoints);
  }
}
