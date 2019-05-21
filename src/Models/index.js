const User = require('./User');
const Reservation = require('./Reservation');
const connection = require('./db/connection');

module.exports = {
  users: new User(connection, 'users'),
  reservations: new Reservation(connection, 'reservations')
};
