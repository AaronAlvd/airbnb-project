'use strict';

const { SpotImage } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fmansion&psig=AOvVaw0crs3rkuUKKEiYZ6dn-7Lz&ust=1725677167711000&source=images&cd=vfe&opi=89978449&ved=0CBQQjhxqFwoTCIjKiMemrYgDFQAAAAAdAAAAABAE',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmansion&psig=AOvVaw0crs3rkuUKKEiYZ6dn-7Lz&ust=1725677167711000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIjKiMemrYgDFQAAAAAdAAAAABAQ',
        preview: true,
      }
  ]);
  },

  async down (queryInterface, Sequelize) {
    await SpotImage.destroy({
      where: {
        [Op.or]: [
          { id: 1 },
          { id: 2 },
        ]
      }
    });
  }
};
