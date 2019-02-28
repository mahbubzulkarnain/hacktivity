'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagsArticles = sequelize.define('TagsArticles', {
    articleId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
    updatedAt: new Date()
  }, {});
  TagsArticles.associate = function(models) {
    // associations can be defined here
  };
  return TagsArticles;
};