const Database = require('./Database');

class Reservation extends Database {
  constructor(connection, schema) {
    super(connection, schema);
  }
}

module.exports = Reservation;
