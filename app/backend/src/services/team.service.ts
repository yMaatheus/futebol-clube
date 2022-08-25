import Team from '../database/models/team';

export interface ITeamService {
  getAll(): Promise<Team[]>
}

class TeamService implements ITeamService {
  getAll = async (): Promise<Team[]> => {
    const teams = Team.findAll();

    return teams;
  };
}

export default new TeamService();
