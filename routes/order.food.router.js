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

router.get('/by-store/:id', async (req, res, next) => {
  try {
    const orders = await service.findByStore(req.params.id);
    res.status(200).json({ data: orders });
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const order = await service.update(req.params.id, req.body);

    if (req.body.status === 'prepared') {
      order.deliveryTime = req.body.deliveryTime;
    }
    order.status = req.body.status;

    req.app.io.emit('updateOrder', order);

    res.status(201).json({ data: order });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;

    const order = await service.create({ ...data, user: req.user.sub });

    req.app.io.emit('newOrder', order);

    res.status(201).json({ data: order });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
