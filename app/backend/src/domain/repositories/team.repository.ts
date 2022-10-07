import Team from '../../database/models/team';

export interface ITeamRepository {
  getAll(): Promise<Team[]>
  getById(id: number): Promise<Team | null>
}

class TeamRepository implements ITeamRepository {
  private model = Team;

  async getAll(): Promise<Team[]> {
    return this.model.findAll();
  }

  async getById(id: number): Promise<Team | null> {
    const team = await this.model.findOne({ where: { id } });
    return team?.get();
  }
}

export default TeamRepository;
