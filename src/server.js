const express = require('express');
const bodyParser = require('body-parser');
const { reservationRouter, userRouter } = require('./Router');
const { port } = require('./Config/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  // log every request to the console
  console.log(req.method, req.url);

  // continue as normal
  next();
});

// Loading routes
app.use('/api', reservationRouter);
app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

// Export app for testing purposes
module.exports = app;
