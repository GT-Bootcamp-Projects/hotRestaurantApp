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
    const result = await super.idQuery(this.selectOne, id);
    return res.json(result);
  }

  async getAll(req, res) {
    const result = await super.idQuery(this.selectAll, null);

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
}

module.exports = Reservation;
