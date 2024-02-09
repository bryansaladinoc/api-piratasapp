const express = require('express');
const router = express.Router();
const ProductService = require('../services/product.service');
const service = new ProductService();

router.get('/', async (req, res, next) => {
  const name = req.query.name;
  try {
    const response = await service.findProduct(name); // ENLISTA TODOS LOS POST
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const response = await service.newProduct({ ...req.body});
    res.status(200).json({ data: response }); // REGISTRAR NUEVA TIENDA
  } catch (e) {
    next(e);
  }
});


module.exports = router;
