const Database = require('./Database');

class User extends Database {
  constructor(connection, schema, id, name, email, phone) {
    super(connection, schema);
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  async getReservations(req, res) {
    try {
      const sql = `SELECT r.*, u.name FROM reservations r JOIN users u ON r.userId = u.id WHERE userId = ?`;
      const result = await super.query(sql, req.params.id);

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.json({ status: 500, message: err });
    }
  }
}

module.exports = User;
