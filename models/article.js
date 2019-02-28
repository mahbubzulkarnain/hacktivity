'use strict';
const formatDate = require('../helpers/date');
const timeAgo = require('../helpers/timeAgo');
const subString = require('../helpers/subString');
const marked = require('marked');
module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        title: {
            type: DataTypes.STRING,
            validate: {
                notNull(value, next) {
                    if (value && value < 1 || !value) {
                        next(`Value cannot null`)
                    }
                    next()
                }
            }
        },
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
    Article.prototype.getContentItemList = function () {
        return marked(subString(this.content))
    };
    Article.prototype.getContentParsed = function () {
        return marked(this.content)
    };
    return Article;
};