const Database = require('./Database');

class User extends Database {
  constructor(connection, schema) {
    super(connection, schema);
  }

  getReservations({ params }, res) {
    this.query(
      `SELECT r.*, u.name FROM reservations r JOIN users u ON r.userId = u.id WHERE userId = ${
        params.id
      }`
    ).then(result => {
      return this.analyzeResult(result, res);
    });
  }
}

module.exports = User;
