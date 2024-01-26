const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsRouter = require('./post.router');
const authRouter = require('./auth.router');
const newsRouter = require('./news.router');
const playerRouter = require('./roster.router');
const postalCodeRouter = require('./postalCode.router');

const routerApi = (app) => {
  app.use('/api/v1', router);
  router.use('/posts', postsRouter);
  router.use('/auth', authRouter);
  router.use(
    '/news',
    passport.authenticate('jwt', { session: false }),
    newsRouter,
  );
  router.use(
    '/players',
    passport.authenticate('jwt', { session: false }),
    playerRouter,
  );
  router.use('/postal-codes', postalCodeRouter);
};

module.exports = routerApi;
