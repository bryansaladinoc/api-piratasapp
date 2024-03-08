const express = require('express');
const router = express.Router();
const ProductService = require('../services/product.service');
const service = new ProductService();

router.post('/create', async (req, res, next) => {
  const idUser = req.user.sub;
  try {
    const response = await service.new({ ...req.body}, idUser);
    res.status(200).json({ data: response }); // REGISTRAR  NUEVO PRODUCTO
  } catch (e) {
    next(e);
  }
});

router.get('/find/active', async (req, res, next) => {
  try {
    const response = await service.findAllActive(); // ENLISTA TODOS LOS PRODUCTOS
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/find/:idProd', async (req, res, next) => {
  const idProd = req.params.idProd;
  try {
    const response = await service.findActive(idProd); // INFORMACION DE UN PRODUCTO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.post('/create/store', async (req, res, next) => {
  const idUser = req.user.sub;
  try {
    const response = await service.newStore({ ...req.body}, idUser);
    res.status(200).json({ data: response }); // REGISTRAR  NUEVO PRODUCTO EN UNA TIENDA
  } catch (e) {
    next(e);
  }
});



router.get('/find/store/:idProduct/:nameStore', async (req, res, next) => {
  const idProduct = req.params.idProduct;
  const nameStore = req.params.nameStore;
  try {
    const response = await service.findInStore(idProduct, nameStore); // BUSCA UN PRODUCTO EN UNA TIENDA
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

//FILTERS
router.patch('/update/info/', async (req, res, next) => {
  try {
    const response = await service.generalUpdate({...req.body}); // ACTUALIZA UNA ESPECIFICACION DE UN PRODUCTO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.delete('/delete/store/', async (req, res, next) => {
  const idProduct = req.query.idProduct;
  const idStore = req.query.idStore;

  try {
    const response = await service.delOfStore(idProduct, idStore); // ELIMINA UN PRODUCTO DE UNA TIENDA
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.delete('/delete/', async (req, res, next) => {
  const idProduct = req.query.idProduct;
  try {
    const response = await service.del(idProduct); // ELIMINA UN PRODUCTO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
