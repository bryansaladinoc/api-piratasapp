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
  const { name} = req.params;
  //const page = req.query.page;
  try {
    const response = await service.findByName(name); // VERIFICA SI EXISTE EL NOMBRE DE LA TIENDA
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const response = await service.newStore({ ...req.body});
    res.status(200).json({ data: response }); // REGISTRAR NUEVA TIENDA
  } catch (e) {
    next(e);
  }
});

router.post('/employee/create', async (req, res, next) => {
  try {
    const response = await service.newEmployee({ ...req.body});
    res.status(200).json({ data: response }); // REGISTRAR NUEVO EMPLEADO DE LA TIENDA
  } catch (e) {
    next(e);
  }
});

router.get('/employee/find', async (req, res, next) => {
  const idStore = req.query.idStore;
  const phone = req.query.phone;
  try {
    const response = await service.findEmployee(idStore, phone); // VERIFICA SI EXISTE EL EMPLEADO
    res.status(200).json({ data: response }); 
  } catch (e) {
    next(e);
  }
});

router.delete('/employee/delete', async (req, res, next) => {
  const idStore = req.query.idStore;
  const phone = req.query.phone;
  try {
    const response = await service.deleteEmployee(idStore, phone); // ELIMINA EL EMPLEADO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});


module.exports = router;
