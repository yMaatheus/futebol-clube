import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './team';

export default class Match extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'home' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'away' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'matchHomeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'matchAwayTeam' });
