'use strict';

const { Review } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Review.bulkCreate([
      {
        review: 'Our stay at the "Charming Family Home" in San Francisco was nothing short of exceptional. From the moment we arrived, it was clear that this property was well-maintained and thoughtfully designed to provide a comfortable and enjoyable experience.',
        userId: 4,
        spotId: 6,
        stars:  5,
      },
      {
        review: 'Our stay at the "Charming Family Home" in San Francisco was nothing short of exceptional. From the moment we arrived, it was clear that this property was well-maintained and thoughtfully designed to provide a comfortable and enjoyable experience.',
        userId: 8,
        spotId: 5,
        stars:  4,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Review.destroy({
      where: {
        [Op.or]: [
          { spotId: 2 },
          { spotId: 1 },
        ]
      }
    });
  }
};
