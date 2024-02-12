const express = require('express');
const router = express.Router();
const ProductService = require('../services/product.service');
const service = new ProductService();

router.post('/create', async (req, res, next) => {
  try {
    const response = await service.new({ ...req.body});
    res.status(200).json({ data: response }); // REGISTRAR  NUEVO PRODUCTO
  } catch (e) {
    next(e);
  }
});

router.post('/create/store', async (req, res, next) => {
  try {
    const response = await service.newStore({ ...req.body});
    res.status(200).json({ data: response }); // REGISTRAR  NUEVO PRODUCTO EN UNA TIENDA
  } catch (e) {
    next(e);
  }
});

router.post('/create/specific', async (req, res, next) => {
  try {
    const response = await service.newSpecific({ ...req.body});
    res.status(200).json({ data: response }); // REGISTRAR  NUEVA ESPECIFICACION DE UN PRODUCTO
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  const name = req.query.name;
  try {
    const response = await service.findLike(name); // PRODUCTOS POR COINCIDENCIA DE NOMBRE
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/find/all', async (req, res, next) => {
  try {
    const response = await service.findAll(); // ENLISTA TODOS LOS PRODUCTOS
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/find/store', async (req, res, next) => {
  const idProduct = req.query.idProduct;
  const idStore = req.query.idStore;
  try {
    const response = await service.findInStore(idProduct, idStore); // BUSCA UN PRODUCTO EN UNA TIENDA
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/find/', async (req, res, next) => {
  const idProd = req.query.idProd;
  try {
    const response = await service.find(idProd); // INFORMACION DE UN PRODUCTO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

//FILTERS
router.get('/fiter/size/', async (req, res, next) => {
  const idProd = req.query.idProd;
  const size = req.query.size;

  try {
    const response = await service.filterBySize(idProd, size); // FILTRO DE TALLA
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/fiter/store/', async (req, res, next) => {
  const idProd = req.query.idProd;
  const size = req.query.size;
  const idStore = req.query.idStore;

  try {
    const response = await service.filterByStore(idProd, size, idStore); // FILTRO DE TALLA
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/fiter/color/', async (req, res, next) => {
  const idProd = req.query.idProd;
  const size = req.query.size;
  const idStore = req.query.idStore;
  const color = req.query.color;

  try {
    const response = await service.filterByColor(idProd, size, idStore, color); // FILTRO DE TALLA
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});


router.patch('/update/info/', async (req, res, next) => {
  try {
    const response = await service.generalUpdate({...req.body}); // ACTUALIZA UNA ESPECIFICACION DE UN PRODUCTO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.patch('/update/epecific/', async (req, res, next) => {
  try {
    const response = await service.upSpecific({...req.body}); // ACTUALIZA UNA ESPECIFICACION DE UN PRODUCTO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});


router.delete('/delete/specific/', async (req, res, next) => {
  const idProduct = req.query.idProduct;
  const idStore = req.query.idStore;
  const idSpecific = req.query.idSpecific;

  try {
    const response = await service.delSpecific(idProduct, idStore, idSpecific); // ELIMINA UN PRODUCTO
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

module.exports = router;
