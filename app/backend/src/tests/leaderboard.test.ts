import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { leaderboardDatabase } from './utils/leaderboard.util';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  describe('Route GET /leaderboard/home', () => {
    it('Returns status 200 and leaderboard', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/leaderboard/home');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(leaderboardDatabase);
    })
  })
})
