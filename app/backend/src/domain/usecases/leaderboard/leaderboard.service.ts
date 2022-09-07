import LeaderboardHome from '../../entities/leaderboardHome.entity';
import matchRepository from '../../repositories/match.repository';

class LeaderboardService {
  getAllHome = async () => {
    const leaderboard = new LeaderboardHome();

    const matches = await matchRepository.getMatchesToLeaderboardHome();

    matches.forEach((match) => {
      const teamRate = leaderboard.getOrCreateTeam(match);
      teamRate.addMatch(match);
      leaderboard.addTeam(teamRate);
    });

    return leaderboard.getLeaderboard();
  };
}

export default new LeaderboardService();
