const express = require('express');

const { Post, Image, User, Comment } = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();
router.post('/', isLoggedIn, (req, res, next) => {
  //POST /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    res.status(201).json(post); //프론트로 돌려줌
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/comment', isLoggedIn,(req, res, next) => {
  //POST /post/1/comment   :postId는 동적으로 바뀌는 부분
  try {
    await Post.findOne({
      where: {id: req.params.postId},
    });
    if(!post){
      return res.status(403).send('존재하지 않는 게시글입니다.'); //악성 유저
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    })
    const post = await Post.create({
      content: req.body.content,
    });
    res.status(201).json(post); //프론트로 돌려줌
  } catch (error) {
    console.error(error);
    next(error);
  }

router.delete('/', (req, res) => {
  //Delete/post
  res.json({ id: 1 });
});

module.exports = router;
