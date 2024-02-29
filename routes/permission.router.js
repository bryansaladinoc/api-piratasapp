const express = require('express');
const Router = express.Router();
const PermissionService = require('../services/permission.service');
const service = new PermissionService();

Router.get('/', async (req, res, next) => {
  try {
    const permissions = await service.find();
    res.status(200).json({ data: permissions });
  } catch (err) {
    next(err);
  }
});

Router.post('/', async (req, res, next) => {
  try {
    const permission = await service.create(req.body);
    res.status(201).json({ data: permission });
  } catch (err) {
    next(err);
  }
});

module.exports = Router;
