const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server');

chai.should();
chai.use(chaiHttp);

describe('HTTP methods', () => {
  it('should respond to /_healthcheck with 200 if health is good', done => {
    chai
      .request(app)
      .get('/_healthcheck')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
