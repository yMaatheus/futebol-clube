import Match from '../../database/models/match';
import Leaderboard from './leaderboard.entity';
import TeamRate from './teamRate.entity';

export default class LeaderboardAway extends Leaderboard {
  public getOrCreateTeam(match: Match): TeamRate {
    let teamRate = this.getTeam(match.teamAway.id);
    if (!teamRate) {
      const { teamName, id } = match.teamAway;
      teamRate = new TeamRate(teamName, id);
    }
    return teamRate;
  }

  public addTeamMatch(teamRate: TeamRate, match: Match) {
    teamRate.addMatch(match, match.awayTeamGoals, match.homeTeamGoals);
    this.addTeam(teamRate);
  }
}
