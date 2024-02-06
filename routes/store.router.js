const express = require('express');
const router = express.Router();
const StoreService = require('../services/store.service');
const service = new StoreService();

router.get('/', async (req, res, next) => {
  try {
    const response = await service.findAllStore(); // ENLISTA TODOS LOS POST
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
