const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local'); //구조분해 변수명 변경 나중에 카카오로그인 시 KakaoStrategy로!
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
  //비동기 요청시 서버에 문제가 발생할 수 있으므로 try catch 넣어줌
  passport.use(
    new LocalStrategy(
      {
        //req.body부분
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          //await은 try로 감싸야함
          const user = await User.findOne({
            where: { email }, //{email: email} es6문법
          });
          if (!user) {
            //done으로 넘겨줌 passport에선 응답을 보내지않음(done으로 결과판단)
            //done(서버에러, 성공, 클라이언트에러)
            done(null, false, { reason: '존재하지 않는 사용자입니다' });
          }
          const result = await bcrypt.compare(password, user.password); //사용자가 입력한 password와 db에 저장된 password 비교
          if (result) {
            return done(null, user); //성공에 사용자 정보 넣어줌
          }
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
};
