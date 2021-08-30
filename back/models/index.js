const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
////////////
// const Sequelize = require('sequelize')(sequelize, Sequelize);
// const env = process.env.NODE_ENV || 'development'; //기본 값은 development
// const config = require('../config/config')[env];
// const db = {};

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

// const comment = require('./comment')(sequelize, Sequelize);
// const hashtag = require('./hashtag')(sequelize, Sequelize);
// const image = require('./image')(sequelize, Sequelize);
// const post = require('./post')(sequelize, Sequelize);
// const user = require('./user')(sequelize, Sequelize);
// //sequelize가 node와 mysql 연결

// db.Comment = comment;
// db.Hashtag = hashtag;
// db.Image = image;
// db.Post = post;
// db.User = user;

// // //반복문 돌면서 실행
// // Object.keys(db).forEach(modelName => {
// //   db[modelName].init(sequelize);
// // });

// //각 모델의 associate 반복문 돌면서 관계 연결
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
