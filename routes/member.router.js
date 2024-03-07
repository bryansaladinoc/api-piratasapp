const express = require('express');
const router = express.Router();
const MemberService = require('../services/member.service');
const service = new MemberService();

router.get('/', async (req, res, next) => {
  try {
    const response = await service.find(); // ENLISTA TODAS LAS TIENDAS
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  const idUser = req.user.sub;
  try {
    const data = await service.create(req.body, idUser);
    res.status(201).json({ data });
  } catch (e) {
    next(e);
  }
});

router.get('/active', async (req, res, next) => {
  try {
    const response = await service.findActive(); // ENLISTA TODAS LAS TIENDAS
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/id/:idMember', async (req, res, next) => {
  const { idMember } = req.params;
  console.log(idMember);
  try {
    const response = await service.findById(idMember); // ENLISTA TODAS LAS TIENDAS
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const response = await service.findUsersMembers(); // ENLISTA TODAS LAS TIENDAS
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/nousers', async (req, res, next) => {
  try {
    const response = await service.findUsersNoMembers(); // ENLISTA TODAS LAS TIENDAS
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.post('/userUpdate', async (req, res, next) => {
  const idUser = req.user.sub;
  try {
    const data = await service.updateToUser(req.body, idUser);
    res.status(200).json({ data });
  } catch (e) {
    next(e);
  }
});

router.patch('/update', async (req, res, next) => {
  const idUser = req.user.sub;
  try {
    const response = await service.updateMember({...req.body}, idUser); // ENLISTA TODAS LAS TIENDAS
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.delete('/delete/:idMember', async (req, res, next) => {
  const { idMember } = req.params;
  try {
    const response = await service.deleteMember(idMember); // ENLISTA TODAS LAS TIENDAS
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
