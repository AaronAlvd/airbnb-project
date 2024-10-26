'use strict';

const { SpotImage } = require('../models');
const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://t3.ftcdn.net/jpg/01/18/46/52/240_F_118465200_0q7Of6UnbA8kDlYEe3a4PuIyue27fbuV.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://t3.ftcdn.net/jpg/01/62/06/40/240_F_162064034_HI2YEgV7km3HMy0rccQczKH2vvpI4OnB.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://media.istockphoto.com/id/1272163106/photo/large-house-with-steep-roof-and-side-entry-three-car-garage.jpg?s=1024x1024&w=is&k=20&c=WEwH-MlAqCy2kSbnaWf1ZQLHhQJHUT3avWrSacFo3Ls=',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://media.istockphoto.com/id/876864896/photo/luxurious-new-construction-home-in-bellevue-wa.jpg?s=612x612&w=0&k=20&c=Y5ZhzHSiyku1N4QGIF5FP4TkVhvEzTkEGSQ4FwZ7nlA=',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://t3.ftcdn.net/jpg/04/32/56/22/360_F_432562253_0AJEmoX8idRHQiBDCCgHjdsHUBZG7ppx.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://t3.ftcdn.net/jpg/01/78/80/66/240_F_178806658_bYV0M0ucWw7XRXM4DhlJmRagYwc4n8QF.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://media.istockphoto.com/id/1450159186/photo/a-white-modern-farmhouse.jpg?s=612x612&w=0&k=20&c=X_ZhjuMI0dWL2kj4ycvjRATivPPoHucaW8RBlXp2Pz8=',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://media.istockphoto.com/id/1424381581/photo/large-villa-with-two-floors-and-garden-in-ed.jpg?s=612x612&w=0&k=20&c=a_jIm_vR31sYxRlADFKiqOiti8I3XLWau1581GRtnNU=',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://media.istockphoto.com/id/147205632/photo/modern-home-with-swimming-pool.jpg?s=612x612&w=0&k=20&c=sxRQ398SxAjC4FrRombjl46oDGJVdy23T7i3RXO-mww=',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://media.istockphoto.com/id/1447708518/photo/modern-villa-exterior-in-summer.jpg?s=612x612&w=0&k=20&c=eKBWYI-6MVGRnA_asTSbirigMLsdBSziGPMSqFPEp_E=',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://media.istockphoto.com/id/177102515/photo/front-view-of-contemporary-home-in-australia.jpg?s=612x612&w=0&k=20&c=a5UH8MytQ1ELjvOIEucvQdgp1ppLtTb1iy1cs9NGfe4=',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://media.istockphoto.com/id/1383913372/video/upscale-modern-mansion-with-pool-and-garden.jpg?s=640x640&k=20&c=RxHkrBjTbrjK6iCSqVCgOGYOwZbEVUWAMjQgxqzDntk=',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://media.istockphoto.com/id/848549286/photo/dream-home-luxury-house-success.jpg?s=612x612&w=0&k=20&c=cjhoNqomNTxgYWxuZ9Ev5PxZh6WY96vvDGf3Hl-7x-U=',
        preview: true,
      },
  ]);
  },

  async down (queryInterface, Sequelize) {
    await SpotImage.destroy({
      where: {
        [Op.or]: [
          { id: 3 },
          { id: 2 },
        ]
      }
    });
  }
};
