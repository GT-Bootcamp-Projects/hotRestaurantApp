const Database = require('./Database');

class User extends Database {
  constructor(connection, schema, id, name, email, phone) {
    super(connection, schema);
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.findByEmail = name => {
      return `SELECT id FROM users WHERE email LIKE '${name}%'`;
    };
  }

  async create({ body }, res) {
    const result = await super.create(body);
    return res.json(result);
  }

  async getOne(
    {
      params: { id }
    },
    res
  ) {
    let sql;
    if (isNaN(parseInt(id))) {
      sql = this.findByEmail(id);
    } else {
      sql = this.selectOne;
    }

    const result = await super.idQuery(sql, id);
    return res.json(result);
  }

  async update(
    {
      params: { id },
      body
    },
    res
  ) {
    const opts = [];
    opts.push(id);
    const result = await super.updateTable(body, opts);

    return res.json(result);
  }

  async delete(
    {
      params: { id }
    },
    res
  ) {
    const result = super.idQuery(this.remove, id);
    return res.json(result);
  }

  async getReservations(
    {
      params: { id }
    },
    res
  ) {
    const sql =
      'SELECT r.*, u.name FROM reservations r JOIN users u ON r.userId = u.id WHERE userId = ?';
    const result = await super.idQuery(sql, id);

    return res.json(result);
  }
}

module.exports = User;
