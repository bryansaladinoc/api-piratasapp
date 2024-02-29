const express = require('express');
const Router = express.Router();
const CountryService = require('../services/country.service');
const service = new CountryService();

Router.get('/', async (req, res, next) => {
  try {
    const result = await service.find();
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = Router;
