const formatter = require('mysql').format;

class Database {
  constructor(connection, schema) {
    this.db = connection;
    this.schema = schema;
  }

  query(sql) {
    return new Promise(resolve => {
      this.db.query(sql, (err, result) => {
        if (err) resolve(err);

        resolve(result);
      });
    });
  }

  analyzeResult(result, res) {
    if (result instanceof Error) {
      return res.json({
        status: 500,
        message: result
      });
    }

    return res.json({ status: 200, message: result });
  }

  create({ body }, res) {
    const sql = formatter(`INSERT INTO ${this.schema} SET ?`, body);
    this.query(sql).then(result => {
      return this.analyzeResult(result, res);
    });
  }

  getAll(req, res) {
    this.query(`SELECT * FROM ${this.schema}`).then(result => {
      return this.analyzeResult(result, res);
    });
  }

  getOne({ params }, res) {
    this.query(`SELECT * FROM ${this.schema} WHERE id = ${params.id}`).then(
      result => {
        return this.analyzeResult(result, res);
      }
    );
  }

  update({ params, body }, res) {
    const sql = formatter(
      `UPDATE ${this.schema} SET ? WHERE id = ${params.id}`,
      body
    );

    this.query(sql).then(result => {
      return this.analyzeResult(result, res);
    });
  }

  delete({ params }, res) {
    this.query(`DELETE FROM ${this.schema} WHERE id = ${params.id}`).then(
      result => {
        return this.analyzeResult(result, res);
      }
    );
  }
}

module.exports = Database;
