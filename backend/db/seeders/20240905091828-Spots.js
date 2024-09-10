'use strict';

const { Spot } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        userId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        userId: 2,
        address: "456 Hollywood Blvd",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.092809,
        lng: -118.328661,
        name: "Code Camp",
        description: "A bootcamp for aspiring software engineers",
        price: 456
      },
      {
        userId: 3,
        address: "789 Innovation Drive",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 47.609722,
        lng: -122.333056,
        name: "Tech University",
        description: "University specializing in cutting-edge technology",
        price: 789
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Spot.destroy({
      where: {
        [Op.or]: [
          { id: 1},
          { id: 2},
          { id: 3}
        ]
      }
    });
  }
};
