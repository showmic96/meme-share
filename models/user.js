module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  fullName: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  freezeTableName: true
});