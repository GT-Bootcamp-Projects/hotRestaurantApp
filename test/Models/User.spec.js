require('@babel/polyfill');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const User = require('../../src/Models/User');
const Database = require('../../src/Models/Database');
const mockUserResults = require('./mockData/mockUserResults.json');

const sandbox = sinon.createSandbox();

chai.should();
chai.use(sinonChai);

const paramReq = {
  params: {
    id: 4
  }
};

const postReq = {
  body: {
    fakeData: 'yay'
  }
};

const res = {
  json: message => message
};

const testErr = new Error('bad query');

const errMsg = {
  status: 500,
  message: 'bad query'
};

describe('User constructor', () => {
  it('should instantiate a database connection', () => {
    const connection = {
      query: sinon.stub().returns(true),
      end: sinon.stub().returns(true)
    };

    const user = new User(connection);

    const test = user.db.query();

    test.should.be.equals(true);
  });
});

describe('User methods', () => {
  let stubber;
  let user;

  beforeEach(() => {
    user = new User(null, 'users');
    stubber = model => {
      sandbox.stub(Database.prototype, '_query').resolves(model);
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return individual user when get() is called', () => {
    stubber(mockUserResults.get);

    user.getOne(paramReq, res).then(result => {
      console.log('SHAHEIN ==> ', result);

      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockUserResults.get);
    });
  });

  it('should return an error message if the query errors', () => {
    stubber(testErr);

    user.getOne(paramReq, res).then(errResult => {
      errResult.should.not.be.null;
      errResult.status.should.be.equals(500);
      errResult.should.be.deep.equals(errMsg);
    });
  });

  it('should return insertId when create() is called', () => {
    stubber(mockUserResults.create);
    const conn = connection(mockUserResults.create);
    const user = new User(conn);

    user.create(postReq, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockUserResults.create);
    });
  });

  it('should return an error message if the query errors', () => {
    stubber(testErr);
    const conn = connection(testErr);
    const user = new User(conn);
    const errResult = user.create(postReq, res);

    errResult.should.not.be.null;
    errResult.status.should.be.equals(500);
    errResult.should.be.deep.equals(errMsg);
  });

  it('should return a list of reservations for a user when getReservations() is called', () => {
    const conn = connection(mockUserResults.getReservations);
    const user = new User(conn);
    const result = user.getReservations(paramReq, res);

    result.should.not.be.null;
    result.status.should.be.equals(200);
    result.message.should.be.deep.equals(mockUserResults.getReservations);
  });

  it('should return an error message if the query errors', () => {
    const conn = connection(testErr);
    const user = new User(conn);
    const errResult = user.getReservations(paramReq, res);

    errResult.should.not.be.null;
    errResult.status.should.be.equals(500);
    errResult.should.be.deep.equals(errMsg);
  });

  it('should return a user id when update() is called', () => {
    const conn = connection(mockUserResults.update);
    const user = new User(conn);
    const result = user.update(paramReq, res);

    result.should.not.be.null;
    result.status.should.be.equals(200);
    result.message.should.be.deep.equals(mockUserResults.update);
  });

  it('should return an error message if the query errors', () => {
    const conn = connection(testErr);
    const user = new User(conn);
    const errResult = user.update(paramReq, res);

    errResult.should.not.be.null;
    errResult.status.should.be.equals(500);
    errResult.should.be.deep.equals(errMsg);
  });

  it('should return a user id when delete() is called', () => {
    const conn = connection(mockUserResults.delete);
    const user = new User(conn);
    const result = user.delete(paramReq, res);

    result.should.not.be.null;
    result.status.should.be.equals(200);
    result.message.should.be.deep.equals(mockUserResults.delete);
  });

  it('should return an error message if the query errors', () => {
    const conn = connection(testErr);
    const user = new User(conn);
    const errResult = user.delete(paramReq, res);

    errResult.should.not.be.null;
    errResult.status.should.be.equals(500);
    errResult.should.be.deep.equals(errMsg);
  });
});
