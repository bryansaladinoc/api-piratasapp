const express = require('express');
const router = express.Router();

const OrderFoodService = require('../services/order.food.service');
const service = new OrderFoodService();

const MyClientOneSignal = require('../utils/notifications/oneSignal');
const OneSignal = require('@onesignal/node-onesignal');

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
    const orders = await service.findByStore(req.params.id, req.query.date);
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

    req.app.io.emit('orders', order);

    res.status(201).json({ data: order });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;

    const order = await service.create({ ...data, user: req.user.sub });

    req.app.io.emit('orders', order);

    const notification = new OneSignal.Notification();
    notification.app_id = '9e3a4ffb-b6b8-4533-803a-6f8d1c95feb9';
    // Name property may be required in some case, for instance when sending an SMS.
    notification.name = 'test_notification_name';
    notification.contents = {
      en: "Gig'em Ags",
    };

    // required for Huawei
    notification.headings = {
      en: "Gig'em Ags",
    };

    // This example uses segments, but you can also use filters or target individual users
    // https://documentation.onesignal.com/reference/create-notification
    notification.included_segments = ['Total Subscriptions'];

    const notificationResponse =
      await MyClientOneSignal.createNotification(notification);

    console.log('Notification response:', notificationResponse);

    res.status(201).json({ data: order });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
