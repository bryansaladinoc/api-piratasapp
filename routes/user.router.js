const express = require('express');
const Router = express.Router();
const passport = require('passport');

const UserService = require('../services/user.service');
const service = new UserService();

Router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.status(200).json({ data: users });
    } catch (err) {
      next(err);
    }
  },
);

Router.post('/signin', async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const result = await service.login(phone, password);
    // res.cookie('token', result, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: 'none',
    // });
    res.status(200).json({ token: result });
  } catch (e) {
    next(e);
  }
});

Router.post('/signup', async (req, res, next) => {
  try {
    const result = await service.store({ ...req.body });
    return res.status(201).json({ data: result });
  } catch (e) {
    next(e);
  }
});

Router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub: id } = req.user;
      const profile = await service.getProfile(id);
      res.status(200).json({ data: profile });
    } catch (err) {
      next(err);
    }
  },
);

// Router.get(
//   '/user',
//   passport.authenticate('jwt', { session: false }),
//   async (req, res, next) => {
//     try {
//       const result = await service.selectUser(req.user.sub);
//       return res.status(201).json({ result });
//     } catch (e) {
//       next(e);
//     }
//   },
// );

Router.patch(
  '/user/update',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const result = await service.updateUser(req.user.sub, { ...req.body });
      return res.status(201).json({ result });
    } catch (e) {
      next(e);
    }
  },
);

Router.patch(
  '/user/password',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const result = await service.updateCurrentPass(req.user.sub, {
        ...req.body,
      });
      return res.status(201).json({ result });
    } catch (e) {
      next(e);
    }
  },
);

module.exports = Router;
