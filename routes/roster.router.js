const express = require('express');
const router = express.Router();

const PlayerService = require('../services/player.service');
const service = new PlayerService();

router.get('/', async (req, res, next) => {
  try {
    const result = await service.find(req.query.type);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await service.findOne(req.params.id);
    res.status(200).json({ data: result });
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
    res.status(201).json({ data: result });
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
