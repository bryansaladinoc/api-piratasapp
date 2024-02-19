const express = require('express');
const router = express.Router();

const OrderFoodService = require('../services/order.food.service');
const service = new OrderFoodService();

router.post('/', async (req, res) => {
  const data = req.body;
  console.log('data body', req.body);
  const order = await service.create(data);

  res.status(201).json({ data: order });
});

module.exports = router;
