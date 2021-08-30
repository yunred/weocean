module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      //id는 기본적으로 들어있음
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      //PostId --> SharepostId
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //이모티콘 저장 mb4
    }
  );
  Post.associate = db => {
    db.Post.belongsTo(db.User); //게시글의 작성자
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); //다대다
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Post.belongsTo(db.Post, { as: 'Sharepost' }); //게시글 공유
    //as에 따라서 post.getLikers처럼 게시글 좋아요 누른 사람을 가져옴
  };
  return Post;
};
