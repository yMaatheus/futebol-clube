import Match from '../../database/models/match';
import ITeamLeaderboardStatus from '../interfaces/ITeamLeaderboardStatus';

const getPoints = (teamGoals: number, otherTeamGoals: number): number => {
  if (teamGoals > otherTeamGoals) {
    return 3;
  }
  if (teamGoals === otherTeamGoals) {
    return 1;
  }
  return 0;
};

export default class TeamRate {
  public readonly name: string;
  public readonly id: number;

  public totalPoints: number;
  public totalGames: number;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: number;

  private matches: Match[];

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;

    this.matches = [];
  }

  public addMatch(match: Match) {
    const points = getPoints(match.homeTeamGoals, match.awayTeamGoals);
    this.totalPoints += points;
    this.totalGames += 1;
    this.totalVictories += (points === 3 ? 1 : 0);
    this.totalDraws += (points === 1 ? 1 : 0);
    this.totalLosses += (points === 0 ? 1 : 0);
    this.goalsFavor += match.homeTeamGoals;
    this.goalsOwn += match.awayTeamGoals;
    this.goalsBalance = (this.goalsFavor - this.goalsOwn);
    this.efficiency = +((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
    this.matches.push(match);
  }

  public getStatus(): ITeamLeaderboardStatus {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}
