const passport = require('passport');
const { User } = require('../models');
const local = require('./local');

module.exports = () => {
  passport.serializeUser((user, done) => {
    //첫 번째 인자: 서버, 두 번째 인자: 성공
    done(null, user.id); //서버에 들고있기 무거우니 id만 저장
  });

  //복원 시 id로 복원
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
