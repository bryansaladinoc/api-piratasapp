const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthService = require('../services/auth.service');
const service = new AuthService();

router.post(
  '/signin',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
    } catch (e) {
      next(e);
    }
  },
);

router.post('/signup', async (req, res, next) => {
  try {
    const result = await service.store({ ...req.body });
    return res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
