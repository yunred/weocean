module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      //id는 기본적으로 들어있음
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      //UserId: 1
      //PostId: 3
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //이모티콘 저장 mb4
    }
  );
  Comment.associate = db => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
