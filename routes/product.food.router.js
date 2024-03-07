const express = require('express');
const Router = express.Router();
const ProductService = require('../services/product.food.service');
const service = new ProductService();

Router.get('/by-store/:id', async (req, res, next) => {
  try {
    const result = await service.findByStore(req.params.id);

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

    req.app.io.emit('products', result);

    res.status(201).json({ data: result });
  } catch (e) {
    next(e);
  }
});

Router.put('/:id', async (req, res, next) => {
  try {
    const product = req.body;
    const id = req.params.id;
    const result = await service.update(id, product);

    req.app.io.emit('products', result);

    res.status(201).json({ data: result });
  } catch (e) {
    next(e);
  }
});

Router.delete('/:id', async (req, res, next) => {
  try {
    const result = await service.delete(req.params.id);

    req.app.io.emit('products', result);

    res.status(201).json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = Router;
