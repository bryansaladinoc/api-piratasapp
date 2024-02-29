const express = require('express');
const Router = express.Router();
const RoleService = require('../services/role.service');
const service = new RoleService();

Router.get('/', async (req, res, next) => {
  try {
    const roles = await service.find();
    res.status(200).json({ data: roles });
  } catch (err) {
    next(err);
  }
});

Router.post('/', async (req, res, next) => {
  try {
    const role = await service.create(req.body);
    res.status(201).json({ data: role });
  } catch (err) {
    next(err);
  }
});

module.exports = Router;
