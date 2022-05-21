'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.article)
    }
  }
  user.init({
    username: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    createdAt: true,
    updatedAt: true
  });

  return user;
};
