import { teamDatabase0, teamDatabase1 } from './utils/teamData';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import Match from '../database/models/match';
import { matchDatabase, matchesDatabase, matchesFinalizedDatabase, matchesInProgressDatabase } from '../tests/utils/matchesData';
import { userDatabase, validUser } from '../tests/utils/userData';
import { teamsDatabase } from '../tests/utils/teamData';
import User from '../database/models/user';
import Team from '../database/models/team';

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
      sinon.stub(Match, "create").resolves({ ...matchDatabase, get: () => matchDatabase } as Match);
      sinon.stub(User, "findOne").resolves(userDatabase as User);
      sinon.stub(Team, "findOne")
        .withArgs({ where: { id: matchDatabase.homeTeam } })
        .resolves(teamDatabase0 as Team)
        .withArgs({ where: { id: matchDatabase.awayTeam } })
        .resolves(teamDatabase1 as Team);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          "homeTeam": matchDatabase.homeTeam,
          "awayTeam": matchDatabase.awayTeam,
          "homeTeamGoals": matchDatabase.homeTeamGoals,
          "awayTeamGoals": matchDatabase.awayTeamGoals
        });

      expect(chaiHttpResponse.status).to.equal(201);
      expect(chaiHttpResponse.body).to.deep.equal(matchDatabase);
    })

    it('If "authorization token" is invalid returns 401 and message "Token must be a valid token"', async () => {
      sinon.stub(Match, "create").resolves(matchDatabase as Match);

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'token_invalido')
        .send({
          "homeTeam": matchDatabase.homeTeam,
          "awayTeam": matchDatabase.awayTeam,
          "homeTeamGoals": matchDatabase.homeTeamGoals,
          "awayTeamGoals": matchDatabase.awayTeamGoals
        });

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
    })

    it('If invalid body returns 400 and message "All fields must be filled"', async () => {
      sinon.stub(Match, "create").resolves(matchDatabase as Match);
      sinon.stub(User, "findOne").resolves(userDatabase as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({});

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    })

    it('If "homeTeam" and "awayTeam" are the same returns status 401 and message "It is not possible to create a match with two equal teams"', async () => {
      sinon.stub(Match, "create").resolves(matchDatabase as Match);
      sinon.stub(User, "findOne").resolves(userDatabase as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          "homeTeam": 1,
          "awayTeam": 1,
          "homeTeamGoals": matchDatabase.homeTeamGoals,
          "awayTeamGoals": matchDatabase.awayTeamGoals
        });

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
    })

    it('If teams id not found returns status 401 and message "There is no team with such id!"', async () => {
      sinon.stub(Match, "create").resolves(matchDatabase as Match);
      sinon.stub(User, "findOne").resolves(userDatabase as User);
      sinon.stub(Team, "findOne").resolves(null);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          "homeTeam": 999,
          "awayTeam": 9999,
          "homeTeamGoals": matchDatabase.homeTeamGoals,
          "awayTeamGoals": matchDatabase.awayTeamGoals
        });

      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
    })
  })

  describe('Route PATCH /matches/:id/finish', () => {
    it('Define match for finalized and returns status 201 and message "Finished"', async () => {
      sinon.stub(Match, "update").resolves();
      sinon.stub(User, "findOne").resolves(userDatabase as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1/finish')
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Finished');
    })

    it('If id invalid returns status 400 and message "Id must be filled"', async () => {
      sinon.stub(Match, "update").resolves();
      sinon.stub(User, "findOne").resolves(userDatabase as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/invalid_id/finish')
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Id must be filled');
    })

    it('If "authorization token" is invalid returns 401 and message "Token must be a valid token"', async () => {
      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'token_invalido')

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
    })
  })

  describe('Route PATCH /matches/:id', () => {
    it('Update match goals and returns status 200', async () => {
      sinon.stub(Match, "update").resolves();
      sinon.stub(Match, "findOne").resolves({ ...matchDatabase, get: () => matchDatabase } as Match);
      sinon.stub(User, "findOne").resolves(userDatabase as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token)
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        })

      expect(chaiHttpResponse.status).to.equal(200);
    })

    it('If invalid id returns 400 and message "Id must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/invalid_id')
        .set('Authorization', token)
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        })

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Id must be filled');
    })

    it('If invalid body returns 400 and message "All fields must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    })

    it('If "Match Id" not found returns 404 and message "Match not found."', async () => {
      sinon.stub(Match, "findOne").resolves(null);
      sinon.stub(User, "findOne").resolves(userDatabase as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token)
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        })

      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Match not found.');
    })

    it('If "authorization token" is invalid returns 401 and message "Token must be a valid token"', async () => {
      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1')

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
    })
  })
})
