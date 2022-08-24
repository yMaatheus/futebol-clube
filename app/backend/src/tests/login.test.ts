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

  describe('Route /login', () => {
    it('Returns status 200 and body contain token property', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin'})
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  
    it('If "email" is not informed returns status 400 and message "All fields must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ password: 'secret_admin'})
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  
    it('If "password" is not informed returns status 400 and message "All fields must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  })
});
