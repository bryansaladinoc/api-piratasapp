const express = require('express');
const router = express.Router();
const passport = require('passport');

const authRouter = require('./auth.router');
const newsRouter = require('./news.router');
const playerRouter = require('./roster.router');

const routerApi = (app) => {
  app.use('/api/v1', router);
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
};

module.exports = routerApi;
