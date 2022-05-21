'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  Comment.init({
    guestName: DataTypes.STRING,
    guestStatus: DataTypes.BOOLEAN,
    guestMessage: DataTypes.STRING,
    inviteID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment',
    updatedAt: true,
    createdAt: true
  });
  
  return Comment;
};
