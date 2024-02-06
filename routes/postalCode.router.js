const express = require('express');
const router = express.Router();

const PostalCodeService = require('../services/postalCode.service');
const service = new PostalCodeService();

router.get('/', async (req, res, next) => {
  try {
    const { state, city, cp } = req.query;
    const result = await service.find(state, city, cp);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

router.get('/states', async (req, res, next) => {
  try {
    const result = await service.findStates();
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get('/states/:name/cities', async (req, res, next) => {
  try {
    const result = await service.findStatesForCity(req.params.name);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
