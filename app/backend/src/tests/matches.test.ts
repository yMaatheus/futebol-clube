import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import Match from '../database/models/match';
import { matchesDatabase } from './utils/matches.util';

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
  })
})
