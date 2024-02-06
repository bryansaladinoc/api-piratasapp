const express = require('express');
const router = express.Router();
const OrderService = require('../services/order.service');
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const response = await service.findAllOrder(); // ENLISTA TODOS LOS POST
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
