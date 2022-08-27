import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/user';
import { invalidUser, userDatabase, validUser } from './utils/user.util';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  describe('Route POST /login', () => {
    beforeEach(async () => {
      sinon.stub(User, "findOne")
      .withArgs({ where: { email: validUser.email } })
      .resolves(userDatabase as User)
      .withArgs({ where: { email: invalidUser.email } })
      .resolves(null);
    });

    it('Returns status 200 and body contain token property', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('If "email" is not informed returns status 400 and message "All fields must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({ password: validUser.password });

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('If "password" is not informed returns status 400 and message "All fields must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({ email: validUser.email });

      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('If "email" is invalid returns status 401 and message "Incorrect email or password"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({ email: invalidUser.email, password: validUser.password });

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('If "password" is invalid returns status 401 and message "Incorrect email or password"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({ email: validUser.email, password: invalidUser.password });

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  })

  describe('Route GET /login/validate', () => {
    it('If "authorization token" is valid returns status 200 and user role', async () => {
      sinon.stub(User, "findOne").resolves(userDatabase as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validUser);

      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', token);

      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.property('role');
      expect(chaiHttpResponse.body.role).to.be.equal('admin');
    })

    it('If "authorization token" is invalid returns 401 and message "Token must be a valid token"', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', 'token_invalido');

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
    })
  })
});
