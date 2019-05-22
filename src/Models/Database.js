const formatter = require('mysql').format;

class Database {
  constructor(connection, schema) {
    this.db = connection;
    this.schema = schema;
    this.selectOne = `SELECT * FROM ${this.schema} WHERE id = ?`;
    this.selectAll = `SELECT * FROM ${this.schema}`;
    this.insert = `INSERT INTO ${this.schema} SET ?`;
    this.modify = `UPDATE ${this.schema} SET ? WHERE id = ?`;
    this.remove = `DELETE FROM ${this.schema} WHERE id = ?`;
  }

  _query(sql) {
    return new Promise(resolve => {
      this.db.query(sql, (err, result) => {
        if (err) resolve(err);

        resolve(result);
      });
    });
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

  async query(queryType, opts) {
    const sql = formatter(queryType, opts);
    const result = await this._query(sql);

    if (result instanceof Error) {
      return { status: 500, message: result };
    } else if (result.length === 0) {
      return { status: 404, message: 'Not found' };
    }

    return { status: 200, message: result };
  }

  async idQuery(sql, id) {
    const result = await this.query(sql, id);

    return result;
  }

  async create(data) {
    const input = await this._sanitize(data);
    const result = await this.query(this.insert, input);

    return result;
  }

  async updateTable(data, opts) {
    const input = await this._sanitize(data);
    opts.unshift(input);
    const result = await this.query(this.modify, opts);

    return result;
  }
}

module.exports = Database;
