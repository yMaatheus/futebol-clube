import ITeamLeaderboardStatus from '../interfaces/ITeamLeaderboardStatus';
import Match from '../database/models/match';
import TeamRate from './teamRate.model';

export default abstract class Leaderboard {
  protected teams: Map<number, TeamRate>;

  constructor() {
    this.teams = new Map<number, TeamRate>();
  }

  public getTeamList(): TeamRate[] {
    return [...this.teams.values()];
  }

  public getTeam(teamId: number): TeamRate | undefined {
    return this.teams.get(teamId);
  }

  public addTeam(team: TeamRate) {
    if (!this.getTeam(team.id)) {
      this.teams.set(team.id, team);
    }
  }

  public abstract getOrCreateTeam(match: Match): TeamRate;

  public abstract getLeaderboard(): ITeamLeaderboardStatus[];
}
