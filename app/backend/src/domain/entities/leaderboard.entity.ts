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

  public abstract getOrCreateTeam(match: Match): TeamRate | TeamRate[];

  public abstract addTeamMatch(teamRate: TeamRate | TeamRate[], match: Match): void;

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
