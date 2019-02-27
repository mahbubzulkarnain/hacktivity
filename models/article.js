'use strict';
module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        title: DataTypes.STRING,
        subheading: DataTypes.STRING,
        slug: DataTypes.STRING,
        thumbhnail: DataTypes.STRING,
        authorId: DataTypes.INTEGER,
        content: DataTypes.TEXT
    }, {
        hooks: {
            afterValidate(article, opt) {
                if (!article.slug) {
                    article.slug = article.title.replace(/\s+/g, '_').replace(/[^\w]/gi, '').toLowerCase() + '_' + (new Date().getTime()+'').slice(-8)
                }
            }
        },
        scopes: {
            withDBAuthor: {
                include: [
                    {
                        model: sequelize.models.User,
                        all: true
                    }
                ]
            }
        }
    });
    Article.associate = function (models) {
        // associations can be defined here
        Article.belongsTo(models.User, {foreignKey: 'authorId'})
    };
    return Article;
};