import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  let chaiHttpResponse: Response;
  const validUser = {
    email: 'admin@admin.com',
    password: 'secret_admin',
  }

  const invalidUser = {
    email: 'ademar@xablau.com',
    password: 'invalid_secret'
  }

  describe('Route /login', () => {
    it('Returns status 200 and body contain token property', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send(validUser)
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  
    it('If "email" is not informed returns status 400 and message "All fields must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ password: validUser.password })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  
    it('If "password" is not informed returns status 400 and message "All fields must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: validUser.email })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('If "email" is invalid returns status 401 and message "Incorrect email or password"', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: invalidUser.email, password: validUser.password })
  
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('If "password" is invalid returns status 401 and message "Incorrect email or password"', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: validUser.email, password: invalidUser.password })
  
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  })
});