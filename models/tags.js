'use strict';
module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define('Tags', {
        name: DataTypes.STRING,
        updatedAt: new Date()
    }, {
        hooks: {
            beforeDestroy(tag, opt) {
                return sequelize.models.TagsArticles.destroy({
                    where: {tagId: tag.id}
                })
            },
        }
    });
    Tags.associate = function (models) {
        // associations can be defined here
        Tags.belongsToMany(sequelize.models.Article, {through: sequelize.models.TagsArticles, foreignKey: 'tagId'})
    };
    return Tags;
};