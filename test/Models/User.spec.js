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
    name: 'fakename',
    email: 'fake@email.fake',
    phone: '4048675309'
  }
};

const updateReq = {
  params: paramReq.params,
  body: postReq.body
};

const res = {
  json: message => message
};

const testErr = new Error('bad query');

const errMsg = {
  status: 500,
  message: testErr
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
    user = new User({}, 'users');
    stubber = model => {
      sandbox.stub(Database.prototype, '_query').resolves(model);
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return individual user when get() is called', () => {
    stubber(mockUserResults.get);

    return user.getOne(paramReq, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockUserResults.get);
    });
  });

  it('should return an error message if the query errors', () => {
    stubber(testErr);

    return user.getOne(paramReq, res).then(errResult => {
      errResult.should.not.be.null;
      errResult.status.should.be.equals(500);
      errResult.should.be.deep.equals(errMsg);
    });
  });

  it('should return insertId when create() is called', () => {
    stubber(mockUserResults.create);

    return user.create(postReq, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockUserResults.create);
    });
  });

  // it('should return an error message if the query errors', () => {
  // stubber(testErr);
  // user.create(postReq, res).then(errResult => {
  // errResult.should.not.be.null;
  // errResult.status.should.be.equals(500);
  // errResult.should.be.deep.equals(errMsg);
  // });
  // });

  it('should return a list of reservations for a user when getReservations() is called', () => {
    stubber(mockUserResults.getReservations);
    return user.getReservations(paramReq, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockUserResults.getReservations);
    });
  });

  // it('should return an error message if the query errors', () => {
  // stubber(testErr);
  // user.getReservations(paramReq, res).then(errResult => {
  // errResult.should.not.be.null;
  // errResult.status.should.be.equals(500);
  // errResult.should.be.deep.equals(errMsg);
  // });
  // });

  it('should return a user id when update() is called', () => {
    stubber(mockUserResults.update);
    return user.update(updateReq, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockUserResults.update);
    });
  });

  // it('should return an error message if the query errors', () => {
  // stubber(testErr);
  // user.update(paramReq, res).then(result => {
  // errResult.should.not.be.null;
  // errResult.status.should.be.equals(500);
  // errResult.should.be.deep.equals(errMsg);
  // });
  // });

  it('should return a user id when delete() is called', () => {
    stubber(mockUserResults.delete);
    return user.delete(paramReq, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockUserResults.delete);
    });
  });

  // it('should return an error message if the query errors', () => {
  // stubber(testErr);

  // user.delete(paramReq, res).then(errResult => {
  // errResult.should.not.be.null;
  // errResult.status.should.be.equals(500);
  // errResult.should.be.deep.equals(errMsg);
  // });
  // });
});
