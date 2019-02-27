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
            email: {
                allowNull: false,
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
                type: Sequelize.STRING,
                defaultValue: false
            },
            token2FA: {
                allowNull: true,
                type: Sequelize.STRING
            },
            avatar: {
                type: Sequelize.INTEGER
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