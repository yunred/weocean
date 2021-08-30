module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      //MySQL에는 소문자+복수로 users로 테이블 생성
      //id는 기본적으로 들어있음
      email: {
        type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, //필수
        unique: true, //고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
      },
      password: {
        type: DataTypes.STRING(100), //암호화때문에 넉넉하게 줌
        allowNull: false, //필수
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', //한글 저장
    }
  );
  User.associate = db => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); //좋아요 많은 유저가 많은 게시물에 좋아요 남길 수 있음
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'FollowingId',
    });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'FollowerId',
    });
  };
  return User;
};
