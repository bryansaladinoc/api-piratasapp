const express = require('express');
const router = express.Router();

const newsRouter = require('./article.router');
const authRouter = require('./auth.router');

const routerApi = (app) => {
  app.use('/api/v1', router);
  router.use('/news', newsRouter);
  router.use('/auth', authRouter);
};

module.exports = routerApi;
