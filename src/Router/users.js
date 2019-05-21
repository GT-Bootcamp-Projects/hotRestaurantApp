const router = require('express').Router();
const { users } = require('../Models');

// User management routes
router.route('/users').post(users.create.bind(users));

router
  .route('/users/:id')
  .get(users.getOne.bind(users))
  .put(users.update.bind(users))
  .delete(users.delete.bind(users));

// Get a specific user's reservations list
router.get('/users/reservations/:id', users.getReservations.bind(users));

module.exports = router;
