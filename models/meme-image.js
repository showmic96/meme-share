module.exports = (sequelize, DataTypes) => sequelize.define('meme-image', {
  username: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  blockedRequests: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  freezeTableName: true,
  paranoid: true
});