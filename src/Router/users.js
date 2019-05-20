const router = require('express').Router();
const { users } = require('../Models');

// User management routes
router.route('/users')
  .post(users.create);

router.route('/users/:id')
  .get(users.get)
  .put(users.update)
  .delete(users.delete);

// Get a specific user's reservations list
router.get('/users/reservations/:id', users.getReservations);

module.exports = router;
