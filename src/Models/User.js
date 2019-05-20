const dbConnection = require('./db/connection').connection;

class User {
  constructor(connection) {
    this.db = connection ? connection : dbConnection();
    this.errMsg = {
      statusCode: 500,
      message: 'An error occurred on your query'
    };
  }

  get({ params }, res) {
    const result = this.db.query(
      `SELECT * FROM users WHERE id = ${params.id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }

        return result;
      }
    );

    if (result instanceof Error) {
      return res.json(this.errMsg);
    }

    return res.json({ status: 200, message: result });
  }

  getReservations({ params }, res) {
    const result = this.db.query(
      `SELECT * FROM reservations WHERE userId = ${params.id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }

        return result;
      }
    );

    if (result instanceof Error) {
      return res.json(this.errMsg);
    }

    return res.json({ status: 200, message: result });
  }

  create(req, res) {
    const result = this.db.query(
      `INSERT INTO users (username) VALUES (${req.body.user})`,
      (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }

        return result;
      }
    );

    if (result instanceof Error) {
      return res.json(this.errMsg);
    }

    return res.json({ status: 200, message: result });
  }

  update({ params, body }, res) {
    const result = this.db.query(
      `UPDATE users SET ? WHERE id = ${params.id}`,
      body,
      (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }

        return result;
      }
    );

    if (result instanceof Error) {
      return res.json(this.errMsg);
    }

    return res.json({ status: 200, message: result });
  }

  delete({ params }, res) {
    const result = this.db.query(
      `DELETE FROM users WHERE id = ${params.id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }

        return result;
      }
    );

    if (result instanceof Error) {
      return res.json(this.errMsg);
    }

    return res.json({ status: 200, message: result });
  }
}

module.exports = User;
