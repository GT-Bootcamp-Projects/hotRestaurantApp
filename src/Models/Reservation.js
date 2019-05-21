const Database = require('./Database');

class Reservation extends Database {
  constructor(
    connection,
    schema,
    id,
    userId,
    reservationDateTime,
    waitingList
  ) {
    super(connection, schema);
    this.id = id;
    this.userId = userId;
    this.reservationDateTime = reservationDateTime;
    this.waitingList = waitingList;
  }
}

module.exports = Reservation;
