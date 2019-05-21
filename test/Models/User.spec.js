const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const User = require('../../src/Models/User');
const mockUserResults = require('./mockData/mockUserResults.json');

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
  let connection;

  beforeEach(() => {
    connection = model => {
      return {
        query: sinon.stub().returns(model)
      };
    };
  });

  it('should return individual user when get() is called', () => {
    const conn = connection(mockUserResults.get);
    const user = new User(conn);
    const result = user.getOne(paramReq, res);

    result.should.not.be.null;
    result.status.should.be.equals(200);
    result.message.should.be.deep.equals(mockUserResults.get);
  });

  it('should return an error message if the query errors', () => {
    const conn = connection(testErr);
    const user = new User(conn);
    const errResult = user.getOne(paramReq, res);

    errResult.should.not.be.null;
    errResult.status.should.be.equals(500);
    errResult.should.be.deep.equals(errMsg);
  });

  it('should return insertId when create() is called', () => {
    const conn = connection(mockUserResults.create);
    const user = new User(conn);
    const result = user.create(postReq, res);

    result.should.not.be.null;
    result.status.should.be.equals(200);
    result.message.should.be.deep.equals(mockUserResults.create);
  });

  it('should return an error message if the query errors', () => {
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

  it('queryCallback() should return result from db if successful', () => {
    const conn = connection('good stuff');
    const user = new User(conn);
    const result = user.queryCallback(null, 'good stuff');

    result.should.not.be.null;
    result.should.be.equals('good stuff');
  });

  it('queryCallback() should return an error if one is present', () => {
    const conn = connection('bad stuff');
    const user = new User(conn);
    const result = user.queryCallback('bad stuff', null);

    result.should.not.be.null;
    result.should.be.equals('bad stuff');
  });
});
