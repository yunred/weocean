const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const passport = require('passport');

const router = express.Router();
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    //Post /user/login
    //(서버, 성공, 클라이언트 에러)
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    //문제 없으면 req.login할 때 passport 로그인 시도
    return req.login(user, async loginErr => {
      //loginErr는 passport login error
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(user); //사용자 정보를 프론트로 넘겨줌
    });
  })(req, res, next);
});

router.post('/', async (req, res, next) => {
  //POST /user/
  try {
    //중복이메일 검사
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.send('OK');
  } catch (error) {
    console.error(error);
    next(error); //next를 통해서 error를 보내면 error들이 한방에 처리됨 //status 500
  }
});

router.post('user/logout', (req, res, next) => {
  req.logout();
  req.seesion.destroy();
  res.send('ok');
});

module.exports = router;
