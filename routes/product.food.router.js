const express = require('express');
const Router = express.Router();
const ProductService = require('../services/product.food.service');
const service = new ProductService();

Router.get('/', async (req, res, next) => {
  try {
    const storeId = req.query.storeId;
    const result = await service.find(storeId);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
});

Router.get('/:id', async (req, res, next) => {
  try {
    const result = await service.findOne(req.params.id);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
});

Router.post('/', async (req, res, next) => {
  try {
    const product = req.body;
    const result = await service.create(product);

    res.status(201).json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = Router;
