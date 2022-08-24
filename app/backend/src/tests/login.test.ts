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

  it('Returns status 200 and body contain token property', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'secret_admin'})

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });
});
