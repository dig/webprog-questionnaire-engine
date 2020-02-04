'use strict';

const express = require('express'),
      Log = require('./log');

const port = process.env.PORT || 80;
const isDev = process.env.DEV || false;

const app = express();
const logger = new Log(isDev);

app.use(express.static('public'));
logger.info('Serving /public.', true);

app.listen(port);
logger.info(`Listening on port ${port}.`);

module.exports = {
  app,
  logger
};