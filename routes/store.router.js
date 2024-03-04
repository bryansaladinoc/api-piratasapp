const express = require('express');
const router = express.Router();
const StoreService = require('../services/store.service');
const service = new StoreService();

router.get('/', async (req, res, next) => {
  try {
    const response = await service.findAllStore(); // ENLISTA TODAS LAS TIENDAS
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});


router.get('/:name', async (req, res, next) => {
  const name = req.params.name;
  try {
    const response = await service.findByName(name);
    res.status(200).json({ data: response }); // BUSCAR TIENDA POR NOMBRE
  } catch (e) {
    next(e);
  }
});

router.post('/create', async (req, res, next) => {
  const idUser = req.user.sub;
  try {
    const response = await service.newStore({ ...req.body}, idUser);
    res.status(200).json({ data: response }); // REGISTRAR NUEVA TIENDA
  } catch (e) {
    next(e);
  }
});


module.exports = router;
