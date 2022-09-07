import ITeamRepository from '../interfaces/ITeamRepository';
import Team from '../../database/models/team';

class TeamRepository implements ITeamRepository {
  getById = async (id: number): Promise<Team | null> => Team.findOne({ where: { id } });
}

export default new TeamRepository();
