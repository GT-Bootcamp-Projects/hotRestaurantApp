const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { reservationRouter, userRouter } = require('./Router');
const { getPort, healthCheck } = require('./Config/config');

const port = getPort();
const app = express();

const requestLogger = (req, res, next) => {
  // log every request to the console
  console.log(req.method, req.url);

  // continue as normal
  next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(requestLogger);

// Loading API routes
app.use('/api', reservationRouter);
app.use('/api', userRouter);

app.get('/_healthcheck', (req, res) => {
  const health = healthCheck();
  res.json(health);
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

// Export app for testing purposes
module.exports = app;
