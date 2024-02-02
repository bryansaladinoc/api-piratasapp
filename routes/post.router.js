const express = require('express');
const router = express.Router();
const PostService = require('../services/post.service');
const service = new PostService();

//POSTS
router.get('/', async (req, res, next) => {
  const page = req.query.page;
  try {
    const response = await service.findAllPost(page); // ENLISTA TODOS LOS POST
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

//LIKES
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

router.get('/likepost/:idpost', async (req, res, next) => {
  const { idpost } = req.params;
  try {
    const response = await service.countLikes(idpost); // ELIMINA EL LIKE DEL USUARIO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});

//COMENTARIOS
router.post('/comments', async (req, res, next) => {
  try {
    const response = await service.createComment({ ...req.body});
    res.status(200).json({ data: response }); // REGISTRAR NUEVO COMENTARIO
  } catch (e) {
    next(e);
  }
});

router.delete('/comments/delete/:idpost/:idcomment', async (req, res, next) => {
  const { idpost,  idcomment} = req.params;
  try {
    const response = await service.deleteComment(idpost,idcomment); // ELIMINA LOS COMENTARIOS POR ID DEL COMENTARIO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);1
  }
});

router.get('/comments/find/:idpost/:iduser', async (req, res, next) => {
  const { idpost,  iduser} = req.params;

  try {
    const response = await service.commentsByPost(idpost,iduser); // ELIMINA LOS COMENTARIOS POR ID DEL COMENTARIO
    res.status(200).json({ data: response });
  } catch (e) {
    next(e);
  }
});


//POSTS ESPECIFICOS
router.get('/byuser/:idUser', async (req, res, next) => {
  const { idUser } = req.params;
  const page = req.query.page;

  try {
    const response = await service.findPostByUser(idUser, page); // BUSCA POSTS POR USUARIO
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

module.exports = router;
