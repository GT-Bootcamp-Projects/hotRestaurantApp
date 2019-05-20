const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const Reservation = require('../../src/Models/Reservation');
const mockReservationResults = require('./mockData/mockReservationResults.json');

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
  let connection;

  beforeEach(() => {
    connection = model => {
      return {
        query: sinon.stub().returns(model),
        end: sinon.stub().returns(true)
      };
    };
  });

  it('should return all reservations when getAll() is called', () => {
    const conn = connection(mockReservationResults.getAll);
    const reservation = new Reservation(conn);
    const result = reservation.getAll(null, res);

    result.should.not.be.null;
    result.status.should.be.equals(200);
    result.message.should.be.deep.equals(mockReservationResults.getAll);
  });

  it('should return insertId when post() is called', () => {
    const conn = connection(mockReservationResults.post);
    const reservation = new Reservation(conn);
    const result = reservation.post(postReq, res);

    result.should.not.be.null;
    result.status.should.be.equals(200);
    result.message.should.be.deep.equals(mockReservationResults.post);
  });

  it('should return a single reservation when getOne() is called', () => {
    const conn = connection(mockReservationResults.getOne);
    const reservation = new Reservation(conn);
    const result = reservation.getOne(paramReq, res);

    result.should.not.be.null;
    result.status.should.be.equals(200);
    result.message.should.be.deep.equals(mockReservationResults.getOne);
  });

  it('should return a reservation id when update() is called', () => {
    const conn = connection(mockReservationResults.update);
    const reservation = new Reservation(conn);
    const result = reservation.update(paramReq, res);

    result.should.not.be.null;
    result.status.should.be.equals(200);
    result.message.should.be.deep.equals(mockReservationResults.update);
  });

  it('should return a reservation id when delete() is called', () => {
    const conn = connection(mockReservationResults.delete);
    const reservation = new Reservation(conn);
    const result = reservation.delete(paramReq, res);

    result.should.not.be.null;
    result.status.should.be.equals(200);
    result.message.should.be.deep.equals(mockReservationResults.delete);
  });
});
