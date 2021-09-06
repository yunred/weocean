const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    origin: true, //보낸 곳의 주소가 자동으로 들어감
    credentials: false,
  })
);
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});
app.get('/', (req, res) => {
  res.send('hello api');
});

app.get('/posts', (req, res) => {
  res.send([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello1' },
    { id: 3, content: 'hello3' },
  ]);
});

app.use('/post', postRouter); //중복되는 post prefix로 빼주기
app.use('/user', userRouter);

//에러처리 미들웨어는 내부적으로 존재

app.listen(3065, () => {
  console.log('서버 실행 중');
});
