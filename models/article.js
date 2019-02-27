'use strict';
const formatDate = require('../helpers/date');
const timeAgo = require('../helpers/timeAgo');
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
                    article.slug = article.title.replace(/\s+/g, '_').replace(/[^\w]/gi, '').toLowerCase() + '_' + (new Date().getTime() + '').slice(-8)
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

    Article.prototype.getTimeAgo = function () {
        return timeAgo(this.createdAt)
    };

    Article.prototype.getCreatedDate = function () {
        return formatDate(this.createdAt)
    };
    return Article;
};