require('@babel/polyfill');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const Reservation = require('../../src/Models/Reservation');
const Database = require('../../src/Models/Database');
const mockReservationResults = require('./mockData/mockReservationResults.json');

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
    userId: 1,
    reservationDateTime: '2019-05-20T19:38:38.766Z',
    waitingList: false
  }
};

const updateReq = {
  params: paramReq.params,
  body: postReq.body
};

const res = {
  json: message => message
};

describe('Reservations constructor', () => {
  it('should instantiate a database connection', () => {
    const connection = {
      query: sinon.stub().returns(true),
      end: sinon.stub().returns(true)
    };

    const reservation = new Reservation(connection);

    const test = reservation.db.query();

    test.should.be.equals(true);
  });
});

describe('Reservations methods', () => {
  let stubber;
  const conn = sinon.stub().returns(true);
  const reservation = new Reservation(conn, 'reservations');

  beforeEach(() => {
    stubber = model => {
      sandbox.stub(Database.prototype, '_query').resolves(model);
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return an insertId when create() is called', () => {
    stubber(mockReservationResults.post);
    return reservation.create(postReq, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockReservationResults.post);
    });
  });

  it('should return all reservations when getAll() is called', () => {
    stubber(mockReservationResults.getAll);
    return reservation.getAll(null, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockReservationResults.getAll);
    });
  });

  it('should return a reservation when getOne() is called', () => {
    stubber(mockReservationResults.getOne);
    return reservation.getOne(paramReq, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockReservationResults.getOne);
    });
  });

  it('should return a reservation id when update() is called', () => {
    stubber(mockReservationResults.update);
    return reservation.update(updateReq, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockReservationResults.update);
    });
  });

  it('should return a reservation id when delete() is called', () => {
    stubber(mockReservationResults.delete);
    return reservation.delete(paramReq, res).then(result => {
      result.should.not.be.null;
      result.status.should.be.equals(200);
      result.message.should.be.deep.equals(mockReservationResults.delete);
    });
  });
});
