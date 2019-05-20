const dbConnection = require('./db/connection');

class User {
  constructor(connection) {
    this.db = connection ? connection : dbConnection();
    this.errMsg = {
      statusCode: 500,
      message: 'An error occurred on your query'
    };
  }

  get({ params: { id } }, res) {
    this.db.query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
      if (err) {
        console.log(err);
        res.json(this.errMsg);
      }

      res.json({ statusCode: 200, message: result });
    });

    this.db.end();
  }

  getReservations({ params: { id } }, res) {
    this.db.query(`SELECT * FROM reservations WHERE userId = ${id}`, (err, result) => {
      if (err) {
        console.log(err);
        res.json(this.errMsg);
      }

      res.json({ statusCode: 200, message: result });
    });
  }

  create(req, res) {
    this.db.query(`INSERT INTO users (username) VALUES (${req.body.user})`, (err, result) => {
      if (err) {
        console.log(err);
        res.json(this.errMsg);
      }

      res.json({ statusCode: 200, message: result.insertId });
    });

    this.db.end();
  }

  update({ params: { id }, body }, res) {
    this.db.query(`UPDATE users SET ? WHERE id = ${id}`, body, (err, result) => {
      if (err) {
        console.log(err);
        res.json(this.errMsg);
      }

      res.json({ statusCode: 200, message: result });
    });

    this.db.end();
  }

  delete({ params: { id } }, res) {
    this.db.query(`DELETE FROM users WHERE id = ${id}`, (err, result) => {
      if (err) {
        console.log(err);
        res.json(this.errMsg);
      }

      res.json({ statusCode: 200, message: 'User successfully deleted' });
    });

    this.db.end();
  }
}

module.exports = User;

