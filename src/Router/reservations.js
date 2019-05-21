const router = require('express').Router();
const { reservations } = require('../Models');

// Reservation routes
router
  .route('/reservations')
  .get(reservations.getAll.bind(reservations))
  .post(reservations.create.bind(reservations));

// Individual reservation routes
router
  .route('/reservations/:id')
  .get(reservations.getOne.bind(reservations))
  .put(reservations.update.bind(reservations))
  .delete(reservations.delete.bind(reservations));

module.exports = router;
