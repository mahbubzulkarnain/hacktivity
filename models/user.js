'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
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
                notNull() {
                    if (value && value.length < 6 || !value) {
                        next(`Min 6 character password`)
                    }
                    next()
                }
            }
        },
        salt: DataTypes.STRING,
        fbToken: DataTypes.STRING,
        usedToken2FA: DataTypes.STRING,
        token2FA: DataTypes.STRING,
        avatar: DataTypes.INTEGER
    }, {
        hooks: {
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
    return User;
};