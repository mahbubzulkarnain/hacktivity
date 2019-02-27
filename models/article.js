'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    subheading: DataTypes.STRING,
    slug: DataTypes.STRING,
    thumbhnail: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};