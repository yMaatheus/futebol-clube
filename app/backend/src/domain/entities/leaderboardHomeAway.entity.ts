import Match from '../../database/models/match';
import Leaderboard from './leaderboard.entity';
import TeamRate from './teamRate.entity';

export default class LeaderboardHomeAway extends Leaderboard {
  public getOrCreateTeam(match: Match): TeamRate[] {
    let teamRateHome = this.getTeam(match.teamHome.id);
    if (!teamRateHome) {
      const { teamName, id } = match.teamHome;
      teamRateHome = new TeamRate(teamName, id);
    }
    let teamRateAway = this.getTeam(match.teamAway.id);
    if (!teamRateAway) {
      const { teamName, id } = match.teamAway;
      teamRateAway = new TeamRate(teamName, id);
    }
    return [teamRateHome, teamRateAway];
  }

  public addTeamMatch(teams: TeamRate[], match: Match) {
    const [teamRateHome, teamRateAway] = teams;
    teamRateHome.addMatch(match, match.homeTeamGoals, match.awayTeamGoals);
    teamRateAway.addMatch(match, match.awayTeamGoals, match.homeTeamGoals);

    this.addTeam(teamRateHome);
    this.addTeam(teamRateAway);
  }
}
