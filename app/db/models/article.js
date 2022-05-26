'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'username' })
    }
  }
  article.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    image: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'article',
    createdAt: true,
    updatedAt: true
  });

  return article;
};
