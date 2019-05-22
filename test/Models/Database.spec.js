const Database = require('../../src/Models/Database');
const Reservation = require('../../src/Models/Reservation');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const sandbox = sinon.createSandbox();

chai.should();
chai.use(sinonChai);

describe('Database methods', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should return 500 with error if _query rejects', () => {
    const db = new Database({}, 'fakeschema');
    sandbox.stub(Database.prototype, '_query').rejects(new Error('problem!'));

    return db
      .query('SELECT * FROM nothing', null)
      .then()
      .catch(err => {
        err.should.not.be.null;
        err.message.should.be.equals('problem!');
      });
  });

  it('should return a resolved promise with an error if an error occurs on the db', () => {
    const connection = {
      query: sinon.stub().yields(new Error('nope'), null)
    };
    const db = new Database(connection, 'fakeschema');

    return db._query('SELECT * FROM nothing').then(result => {
      result.should.not.be.null;
      result.should.be.an.instanceof(Error);
      result.message.should.be.equals('nope');
    });
  });

  it('should return a resolved promise with data if the database query returns result', () => {
    const connection = {
      query: sinon.stub().yields(null, { data: 'fake data' })
    };
    const db = new Database(connection, 'fakeschema');

    return db._query('SELECT * FROM nothing').then(result => {
      result.should.not.be.null;
      result.should.be.an.instanceof(Object);
      result.data.should.be.equals('fake data');
    });
  });

  it('_sanitize() should reject the promise if the body object has no relevant keys', () => {
    const body = { fake: 'not a real key' };
    const connection = sinon.stub().returns(true);

    // Using reservations for the test, doesn't matter which constructor is used
    const reservations = new Reservation(connection, 'reservations');

    return reservations
      ._sanitize(body)
      .then()
      .catch(err => {
        err.should.not.be.null;
        err.should.be.an.instanceof(Error);
        err.message.should.be.equals('No usable keys sent!');
      });
  });
});
