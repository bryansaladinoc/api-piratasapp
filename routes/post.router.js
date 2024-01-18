const express = require('express');
const router = express.Router();
const PostService = require('../services/post.service');
const service = new PostService();

router.get('/', async (req, res, next) => {
    try {
      const response = await service.findAllPost();
      res.status(200).json({data: response});
    } catch (e) {
      next(e);
    }
  });

  router.post('/nuevo', async (req, res, next) => {
    try {
      const response = await service.createPost({...req.body});
      res.status(200).json({data: response});
    } catch (e) {
      next(e);
    }
  });
  
  router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
      const response = await service.findPost(id);
      res.status(200).json({data: response});
    } catch (e) {
      next(e);
    }
  });

  


  module.exports = router;