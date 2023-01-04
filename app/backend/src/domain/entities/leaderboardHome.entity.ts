import Match from '../../database/models/match';
import Leaderboard from './leaderboard.entity';
import TeamRate from './teamRate.entity';

export default class LeaderboardHome extends Leaderboard {
  public getOrCreateTeam(match: Match): TeamRate {
    let teamRate = this.getTeam(match.teamHome.id);
    if (!teamRate) {
      const { teamName, id } = match.teamHome;
      teamRate = new TeamRate(teamName, id);
    }
    return teamRate;
  }

  public addTeamMatch(teamRate: TeamRate, match: Match) {
    teamRate.addMatch(match, match.homeTeamGoals, match.awayTeamGoals);
    this.addTeam(teamRate);
  }
}
