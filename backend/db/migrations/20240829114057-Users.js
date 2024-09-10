'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "firstName", {
      type: Sequelize.STRING(256),
      allowNull: false,
    }, options);

    await queryInterface.addColumn("Users", "lastName", {
      type: Sequelize.STRING(256),
      allowNull: false,
    }, options);  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      {
        tableName: 'Users',
        schema: options.schema  
      },
      'firstName',
      options
    );
    await queryInterface.removeColumn(
      {
        tableName: 'Users',
        schema: options.schema  
      },
      'lastName',
      options
    );
  }
};
