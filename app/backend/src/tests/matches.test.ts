import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import Match from '../database/models/match';
import { matchDatabase, matchesDatabase, matchesFinalizedDatabase, matchesInProgressDatabase } from './utils/matches.util';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  describe('Route GET /matches', () => {
    it('Returns status 200 and matches list', async () => {
      sinon.stub(Match, "findAll").resolves(matchesDatabase as []);

      chaiHttpResponse = await chai.request(app)
        .get('/matches');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesDatabase);
    })

    it('Returns status 200 and filtered matches list by "inProgress"', async () => {
      sinon.stub(Match, "findAll").resolves(matchesInProgressDatabase as []);

      chaiHttpResponse = await chai.request(app)
        .get('/matches?inProgress=true');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesInProgressDatabase);
    })

    it('Returns status 200 and filtered matches list by "Finalized"', async () => {
      sinon.stub(Match, "findAll").resolves(matchesFinalizedDatabase as []);

      chaiHttpResponse = await chai.request(app)
        .get('/matches?inProgress=false');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesFinalizedDatabase);
    })
  })

  describe('Route POST /matches', () => {
    it('Create match and returns status 201 and match', async () => {
      sinon.stub(Match, "create").resolves(matchDatabase as Match);

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .send({
          "homeTeam": matchDatabase.homeTeam,
          "awayTeam": matchDatabase.awayTeam,
          "homeTeamGoals": matchDatabase.homeTeamGoals,
          "awayTeamGoals": matchDatabase.awayTeamGoals
        });

      expect(chaiHttpResponse.status).to.equal(201);
      expect(chaiHttpResponse.body).to.deep.equal(matchDatabase);
    })
  })
})
