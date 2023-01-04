import Match from '../../database/models/match';
import ITeamLeaderboardStatus from '../interfaces/ITeamLeaderboardStatus';
import TeamRate from './teamRate.entity';

export default abstract class Leaderboard {
  /*
    What is map? How to use tutorial:
    https://howtodoinjava.com/typescript/maps/
  */

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
