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

module.exports = router;
