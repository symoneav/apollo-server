'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING ,
        unique: {
          args: true,
          msg: 'Slug address already in use!'
      }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Links');
  }
};

