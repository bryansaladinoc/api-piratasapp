const express = require('express');
const router = express.Router();

const newsRouter = require('./article.router');

const routerApi = (app) => {
  app.use('/api/v1', router);
  router.use('/news', newsRouter);
};

module.exports = routerApi;
