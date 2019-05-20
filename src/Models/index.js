const User = require('./User');
const Reservation = require('./Reservation');

module.exports = {
  users: new User(),
  reservations: new Reservation()
}

