import Match from '../database/models/match';

export default interface IMatchRepository {
  getAll(): Promise<Match[]>
  getAllByFilter(inProgress: boolean): Promise<Match[]>
}
