const express = require('express');
const router = express.Router();
const passport = require('passport');

const newsRouter = require('./article.router');
const postsRouter = require('./post.router');
const authRouter = require('./auth.router');

const routerApi = (app) => {
  app.use('/api/v1', router);
  router.use('/news', newsRouter);
  router.use('/posts', postsRouter);
  router.use('/auth', authRouter);
};

module.exports = routerApi;
