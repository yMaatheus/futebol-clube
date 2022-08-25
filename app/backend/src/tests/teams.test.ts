import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/team';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  let chaiHttpResponse: Response;
  describe('Route /teams', () => {
    const teamsDatabase = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
    ]

    beforeEach(async () => sinon.stub(Team, "findAll").resolves(teamsDatabase as Team[]));
    afterEach(() => (Team.findAll as sinon.SinonStub).restore())

    it('Returns status 200 and team list', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/teams');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teamsDatabase);
    })
  })
})
