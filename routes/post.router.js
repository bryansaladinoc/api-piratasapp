const express = require('express');
const router = express.Router();
const PostService = require('../services/post.service');
const service = new PostService();

router.get('/', async (req, res, next) => {
  try {
    const response = await service.findAllPost(); // ENLISTA TODOS LOS POST
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.post('/newpost', async (req, res, next) => {
  try {
    const response = await service.createPost({ ...req.body }); // AÑADE UN NUEVO POST
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.post('/likepost', async (req, res, next) => {
  try {
    const response = await service.likePostByUser({ ...req.body }); //AÑADE EL LIKE DEL USUARIO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.delete('/likepost/:idpost/:iduser', async (req, res, next) => {
  const { idpost,  iduser} = req.params;
  try {
    const response = await service.deleteLikePostByUser(idpost,iduser); // ELIMINA EL LIKE DEL USUARIO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.post('/commets', async (req, res, next) => {
  try {
    const response = await service.commentsByPost({ ...req.body});
    res.status(200).json({ data: response }); // ENLISTA LOS COMENTARIOS
  } catch (e) {
    next(e);
  }
});

router.delete('/comments/:idpost/:idcomment', async (req, res, next) => {
  const { idpost,  idcomment} = req.params;
  try {
    const response = await service.deleteCommentByUSer(idpost,idcomment); // ELIMINA LOS COMENTARIOS POR ID DEL COMENTARIO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/byuser/:idUser', async (req, res, next) => {
  const { idUser } = req.params;
  try {
    const response = await service.findPostByUser(idUser); // BUSCA POSTS POR USUARIO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.findPost(id); // BUSCA POST POR ID
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

router.delete('/deletepost/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await service.deletePost(id); // ELIMINA EL POST
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});


router.patch('/updatecollection/:idUser', async (req, res, next) => {
  const { idUser } = req.params;
  try {
    const response = await service.updateCollection(idUser, { ...req.body }); // ACTUALIZA LA COLLECCION CUANDO EL USUARIO SE MODIFICA
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
