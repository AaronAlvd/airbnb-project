'use strict';

const { Review } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await Review.bulkCreate([
      {
        review: 'Our stay at the "Charming Family Home" in San Francisco was nothing short of exceptional. From the moment we arrived, it was clear that this property was well-maintained and thoughtfully designed to provide a comfortable and enjoyable experience.',
        userId: 3,
        spotId: 1,
        stars: 5,
      },
      {
        review: 'Our stay at the "Charming Family Home" in San Francisco was nothing short of exceptional. From the moment we arrived, it was clear that this property was well-maintained and thoughtfully designed to provide a comfortable and enjoyable experience.',
        userId: 2,
        spotId: 2,
        stars: 4,
      },
    ], { validate: true });  
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