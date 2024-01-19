const express = require('express');
const router = express.Router();
const ArticleService = require('../services/article.service');
const service = new ArticleService();

router.get('/', async (req, res, next) => {
  try {
    const news = await service.find();
    res.status(200).json({ data: news });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await service.store({ ...req.body });
    res.status(201).json({ data: result });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
