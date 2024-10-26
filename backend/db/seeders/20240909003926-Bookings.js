'use strict';

const { Booking } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        "spotId": 2,
        "userId": 1,
        "startDate": "2025-09-15T14:00:00Z",
        "endDate": "2025-09-15T16:00:00Z"
      },
      {
        "spotId": 1,
        "userId": 3,
        "startDate": "2025-09-16T09:00:00Z",
        "endDate": "2025-09-16T11:00:00Z"
      },
      {
        "spotId": 3,
        "userId": 2,
        "startDate": "2025-09-17T10:00:00Z",
        "endDate": "2025-09-17T12:00:00Z"
      },
      {
        "spotId": 2,
        "userId": 3,
        "startDate": "2025-09-18T13:00:00Z",
        "endDate": "2025-09-18T15:00:00Z"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Booking.destroy({
      where: {
        [Op.or]: [
          {
            spotId: 2,
            userId: 1,
            startDate: "2025-09-15T14:00:00Z",
            endDate: "2025-09-15T16:00:00Z"
          },
          {
            spotId: 1,
            userId: 3,
            startDate: "2025-09-16T09:00:00Z",
            endDate: "2025-09-16T11:00:00Z"
          },
          {
            spotId: 3,
            userId: 2,
            startDate: "2025-09-17T10:00:00Z",
            endDate: "2025-09-17T12:00:00Z"
          },
          {
            spotId: 2,
            userId: 3,
            startDate: "2025-09-18T13:00:00Z",
            endDate: "2025-09-18T15:00:00Z"
          }
        ]
      }
    })
  }
};
