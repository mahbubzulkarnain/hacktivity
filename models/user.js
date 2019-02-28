'use strict';
const bcrypt = require('bcrypt');
const marked = require('marked');
const fs = require('fs');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        bio: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isUnique(value, next) {
                    sequelize.models.User.findOne({
                        where: {
                            email: value,
                            id: {[sequelize.Op.ne]: +this.id}
                        }
                    })
                        .then((user) => {
                            if (user) {
                                next(`Email has already exists!`)
                            }
                            next()
                        })
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            validate: {
                notNull(value, next) {
                    if (value && value.length < 3 || !value) {
                        next(`Min 3 character username`)
                    }
                    next()
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notNull(value, next) {
                    if (value && value.length < 6 || !value) {
                        next(`Min 6 character password`)
                    }
                    next()
                }
            }
        },
        salt: DataTypes.STRING,
        fbToken: DataTypes.STRING,
        usedToken2FA: DataTypes.BOOLEAN,
        token2FA: DataTypes.STRING,
        avatar: DataTypes.STRING,
        updatedAt: new Date()
    }, {
        hooks: {
            beforeDestroy(user, opt) {
                try {
                    fs.unlinkSync('public/uploads/images/' + user.id + '/');
                } catch (e) {
                    console.log(e)
                }
                return sequelize.models.Article.destroy({
                    where: {authorId: user.id}
                })
            },
            afterValidate(user, opt) {
                if (!user.salt) {
                    user.salt = bcrypt.genSaltSync(6);
                    user.password = bcrypt.hashSync(user.password, user.salt);
                }
            }
        }
    });
    User.associate = function (models) {
        // associations can be defined here
    };
    User.prototype.fullname = function () {
        return this.firstName + ' ' + this.lastName;
    };
    User.prototype.getBioParsed = function () {
        return marked(this.bio || '')
    };
    User.prototype.getAvatarLink = function () {
        if (this.avatar) {
            return this.avatar.replace(/^\s+/g, '').replace(/^public/g, '') + '?v=' + (new Date(this.updatedAt).getTime() + '').substring(-8);
        } else {
            return ''
        }

    };
    return User;
};