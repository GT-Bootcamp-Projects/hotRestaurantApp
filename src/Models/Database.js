const formatter = require('mysql').format;

class Database {
  constructor(connection, schema) {
    this.db = connection;
    this.schema = schema;
    this.select = `SELECT * FROM ${this.schema} WHERE id = ?`;
    this.selectAll = `SELECT * FROM ${this.schema}`;
    this.insert = `INSERT INTO ${this.schema} SET ?`;
    this.update = `UPDATE ${this.schema} SET ? WHERE id = ?`;
    this.delete = `DELETE FROM ${this.schema} WHERE id = ?`;
  }

  _query(sql) {
    return new Promise(resolve => {
      this.db.query(sql, (err, result) => {
        if (err) resolve(err);

        resolve(result);
      });
    });
  }

  _analyzeResult(result) {
    if (result instanceof Error) {
      return { status: 500, message: result };
    }

    return { status: 200, message: result };
  }

  async query(queryType, opts) {
    const sql = formatter(queryType, opts);
    const result = await this._query(sql);

    return this._analyzeResult(result);
  }

  _sanitize(body) {
    return new Promise((resolve, reject) => {
      const sanitizedObj = {};
      for (const key in body) {
        if (this.hasOwnProperty(key)) {
          sanitizedObj[key] = body[key];
        }
      }

      if (
        Object.entries(sanitizedObj).length === 0 &&
        sanitizedObj.constructor === Object
      ) {
        reject(new Error('No usable keys sent!'));
      }

      resolve(sanitizedObj);
    });
  }

  async create(req, res) {
    try {
      const user = await this._sanitize(req.body);
      const result = await super.query(this.insert, user);
      console.log(result);

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.json({ status: 500, message: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const result = await super.query(this.select, req.params.id);

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.json({ status: 500, message: err });
    }
  }

  async getAll(req, res) {
    try {
      const result = await super.query(this.selectAll, req.params.id);

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.json({ status: 500, message: err });
    }
  }

  async update(req, res) {
    try {
      const user = await this._sanitize(req.body);
      const result = await super.query(this.update, user);

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.json({ status: 500, message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await super.query(this.delete, req.params.id);

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.json({ status: 500, message: err });
    }
  }
}

module.exports = Database;
