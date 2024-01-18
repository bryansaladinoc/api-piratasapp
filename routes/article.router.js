const express = require('express');
const router = express.Router();
const ArticleService = require('../services/article.service');
const service = new ArticleService();

router.get('/', (req, res, next) => {
  try {
    service.find();
    res.json('All News');
  } catch (e) {
    next(e);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    service.find();
    res.status(201).json('All News 2');
  } catch (e) {
    next(e);
  }
});

router.put('/:id', (req, res) => {
  try {
    res.json('All News');
  } catch (e) {
    console.log(e);
  }
});

router.post('/', (req, res) => {
  try {
    res.json('All News');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
