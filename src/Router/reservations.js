const router = require('express').Router();
const { reservations } = require('../Models');

// Reservation routes
router.route('/reservations')
  .get(reservations.getAll)
  .post(reservations.post);

// Individual reservation routes
router.route('/reservations/:id')
  .get(reservations.getOne)
  .put(reservations.update)
  .delete(reservations.delete);

module.exports = router;
