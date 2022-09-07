import Team from "../../database/models/team";

export default interface ITeamRepository {
  getById(id: number): Promise<Team | null>
}
