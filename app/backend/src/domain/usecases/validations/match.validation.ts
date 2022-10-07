import { ALL_FIELDS_NOT_FILLED } from '../../errors/appError';
import { TEAMS_EQUAL } from '../../errors/match.error';
import IRequestUpdateMatch from '../../interfaces/IRequestUpdateMatch';
import IRequestCreateMatch from '../../interfaces/IRequestCreateMatch';
import { matchCreateSchema, matchUpdateSchema } from '../schemas/match.schema';

export const validateMatchCreate = (body: IRequestCreateMatch): IRequestCreateMatch => {
  const { error } = matchCreateSchema.validate(body);

  if (error) throw ALL_FIELDS_NOT_FILLED;

  if (body.homeTeam === body.awayTeam) throw TEAMS_EQUAL;

  return body;
};

export const validateMatchUpdate = (body: IRequestUpdateMatch): IRequestUpdateMatch => {
  const { error } = matchUpdateSchema.validate(body);

  if (error) throw ALL_FIELDS_NOT_FILLED;

  return body;
};
