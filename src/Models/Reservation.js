const dbConnection = require('./db/connection').connection;

class Reservation {
  constructor(connection) {
    this.db = connection ? connection : dbConnection();
  }

  getAll(req, res) {
    return res.json({ status: 404, message: 'Not implemented', request: req });
  }

  post(req, res) {
    return res.json({ status: 404, message: 'Not implemented', request: req });
  }

  getOne({ params }, res) {
    return res.json({ status: 404, message: 'Not implemented', params });
  }

  update({ params, body }, res) {
    return res.json({ status: 404, message: 'Not implemented', params, body });
  }

  delete({ params }, res) {
    return res.json({ status: 404, message: 'Not implemented', params });
  }
}

module.exports = Reservation;
