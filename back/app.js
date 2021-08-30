const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use(
  cors({
    origin: true, //보낸 곳의 주소가 자동으로 들어감
    credentials: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(3065, () => {
  console.log('서버 실행 중');
});
