'use strict';

const { Spot } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await Spot.bulkCreate([
      {
        userId: 1,
        address: "456 Maple Avenue",
        city: "Rivertown",
        state: "TX",
        country: "USA",
        lat: 29.7604,
        lng: -95.3698,
        name: "Cottage",
        description: "A charming and cozy cottage with a beautiful garden and modern amenities.",
        price: 120.50,
      },
      {
        userId: 2,
        address: "455 Maple Avenue",
        city: "Rivertown",
        state: "TX",
        country: "USA",
        lat: 29.7604,
        lng: -95.3698,
        name: "Cottager",
        description: "A charming and cozy cottage with a beautiful garden and modern amenities.",
        price: 120.50,
      },
  ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      userId: 1,
      address: "456 Maple Avenue",
      city: "Rivertown",
      state: "TX",
      country: "USA",
      lat: 29.7604,
      lng: -95.3698,
      name: "Cottage",
      description: "A charming and cozy cottage with a beautiful garden and modern amenities.",
      price: 120.50
    }, {});
  }
};
