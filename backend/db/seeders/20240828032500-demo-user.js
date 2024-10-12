'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        id: 1,
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 2,
        firstName: 'User',
        lastName: 'Three',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id: 3,
        firstName: 'User',
        lastName: 'Four',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        id: 4,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johnDoe123',
        hashedPassword: bcrypt.hashSync('password1')
      },
      
      {
        id: 5,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        username: 'janeSmith456',
        hashedPassword: bcrypt.hashSync('password2')
      },
      
      {
        id: 6,
        firstName: 'Alice',
        lastName: 'Jones',
        email: 'alice.jones@example.com',
        username: 'aliceJ789',
        hashedPassword: bcrypt.hashSync('password3')
      },
      
      {
        id: 7,
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        username: 'bobBrown321',
        hashedPassword: bcrypt.hashSync('password4')
      },
      
      {
        id: 8,
        firstName: 'Charlie',
        lastName: 'Black',
        email: 'charlie.black@example.com',
        username: 'charlieB987',
        hashedPassword: bcrypt.hashSync('password5')
      },
      
      {
        id: 9,
        firstName: 'Dave',
        lastName: 'White',
        email: 'dave.white@example.com',
        username: 'daveW654',
        hashedPassword: bcrypt.hashSync('password6')
      },
      
      {
        id: 10,
        firstName: 'Eve',
        lastName: 'Green',
        email: 'eve.green@example.com',
        username: 'eveG432',
        hashedPassword: bcrypt.hashSync('password7')
      },
      
      {
        id: 11,
        firstName: 'Frank',
        lastName: 'Gray',
        email: 'frank.gray@example.com',
        username: 'frankG876',
        hashedPassword: bcrypt.hashSync('password8')
      },
      
      {
        id: 12,
        firstName: 'Grace',
        lastName: 'Red',
        email: 'grace.red@example.com',
        username: 'graceR123',
        hashedPassword: bcrypt.hashSync('password9')
      },
      
      {
        id: 13,
        firstName: 'Henry',
        lastName: 'Yellow',
        email: 'henry.yellow@example.com',
        username: 'henryY456',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [
        'Demo-lition',
        'FakeUser1',
        'FakeUser2',
        'johnDoe123',
        'janeSmith456',
        'aliceJ789',
        'bobBrown321',
        'charlieB987',
        'daveW654',
        'eveG432',
        'frankG876',
        'graceR123',
        'henryY456'
      ] }
    }, {});
  }
};
