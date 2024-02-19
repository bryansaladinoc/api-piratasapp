const express = require('express');
const router = express.Router();

const OrderFoodService = require('../services/order.food.service');
const service = new OrderFoodService();

router.get('/find-by-user', async (req, res, next) => {
  try {
    const orders = await service.findByUser(req.user.sub);
    res.status(200).json({ data: orders });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const order = await service.create({ ...data, userId: req.user.sub });

    res.status(201).json({ data: order });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
