const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthService = require('../services/auth.service');
const service = new AuthService();

router.post('/signin', async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const result = await service.login(phone, password);

    res.status(200).json({ token: result });
  } catch (e) {
    next(e);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const result = await service.store({ ...req.body });
    return res.status(201).json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const result = await service.selectUser(req.user.sub);
      return res.status(201).json({ result });
    } catch (e) {
      next(e);
    }
  },
);

router.patch(
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

router.patch(
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

module.exports = router;
