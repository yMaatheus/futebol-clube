import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/team';

import { app } from '../app';

import { Response } from 'superagent';
import { teamsDatabase } from './utils/teamData';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  describe('Route GET /teams', () => {
    it('Returns status 200 and team list', async () => {
      sinon.stub(Team, "findAll").resolves(teamsDatabase as Team[]);

      chaiHttpResponse = await chai.request(app)
        .get('/teams');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teamsDatabase);
    })
  })

  describe('Route GET /teams/:id', () => {
    const teamDatabase = {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      }
    
    it('Returns status 200 and team', async () => {
      sinon.stub(Team, "findOne").resolves({...teamDatabase, get: () => teamDatabase } as Team);

      chaiHttpResponse = await chai.request(app)
        .get('/teams/1');

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(teamDatabase);
    })

    it('If "id" is invalid returns status 400 and message "Id is invalid"', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/teams/string');

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Id is invalid');
    })

    it('If "id" not found returns status 404 and message "Team not found"', async () => {
      sinon.stub(Team, "findOne").resolves(null);
      
      chaiHttpResponse = await chai.request(app)
        .get('/teams/999');

      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Team not found');
    })
  })
})
