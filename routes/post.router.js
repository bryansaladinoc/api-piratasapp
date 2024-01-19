const express = require('express');
const router = express.Router();
const PostService = require('../services/post.service');
const service = new PostService();

router.get('/', async (req, res, next) => {
  try {
    const response = await service.findAllPost();
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.post('/newpost', async (req, res, next) => {
  try {
    const response = await service.createPost({ ...req.body });
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.post('/likepost', async (req, res, next) => {
  try {
    const response = await service.likePostByUser({ ...req.body });
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.delete('/deletepost/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.deletePost(id);
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.findPost(id);
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/byuser/:idUser', async (req, res, next) => {
  const { idUser } = req.params;
  try {
    const response = await service.findPostByUser(idUser);
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});




module.exports = router;
