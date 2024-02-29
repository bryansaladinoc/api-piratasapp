const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsRouter = require('./post.router');
const userRouter = require('./user.router');
const newsRouter = require('./news.router');
const playerRouter = require('./roster.router');
const postalCodeRouter = require('./postalCode.router');
const storeFoodRouter = require('./store.food.router');
const productFoodRouter = require('./product.food.router');
const orderFoodRouter = require('./order.food.router');
const countryRouter = require('./country.router');
const roleRouter = require('./role.router');
const permissionRouter = require('./permission.router');

const routerApi = (app) => {
  app.use('/api/v1', router);
  router.use('/posts', postsRouter);
  router.use('/users', userRouter);
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
  router.use(
    '/stores-food',
    passport.authenticate('jwt', { session: false }),
    storeFoodRouter,
  );
  router.use(
    '/products-food',
    passport.authenticate('jwt', { session: false }),
    productFoodRouter,
  );
  router.use(
    '/orders-food',
    passport.authenticate('jwt', { session: false }),
    orderFoodRouter,
  );
  router.use(
    '/roles',
    passport.authenticate('jwt', { session: false }),
    roleRouter,
  );
  router.use(
    '/permissions',
    passport.authenticate('jwt', { session: false }),
    permissionRouter,
  );
  router.use(
    '/countries',
    passport.authenticate('jwt', { session: false }),
    countryRouter,
  );
  router.use('/postal-codes', postalCodeRouter);
};

module.exports = routerApi;
