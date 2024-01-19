const express = require('express');
const router = express.Router();

const NewsService = require('../services/news.service');
const service = new NewsService();

router.get('/', async (req, res, next) => {
  try {
    const news = await service.find();
    res.status(200).json({ data: news });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const news = await service.findOne(req.params.id);
    res.status(200).json({ data: news });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await service.create({ ...req.body });
    res.status(201).json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const result = await service.update(req.params.id, { ...req.body });
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await service.delete(req.params.id);
    res.status(201).json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
