'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            bio: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            email: {
                allowNull: true,
                type: Sequelize.STRING,
                unique: true
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            salt: {
                type: Sequelize.STRING
            },
            fbToken: {
                allowNull: true,
                type: Sequelize.STRING
            },
            usedToken2FA: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            token2FA: {
                allowNull: true,
                type: Sequelize.STRING
            },
            avatar: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};