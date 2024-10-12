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
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmansion&psig=AOvVaw0crs3rkuUKKEiYZ6dn-7Lz&ust=1725677167711000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIjKiMemrYgDFQAAAAAdAAAAABAQ',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://media.istockphoto.com/id/1272163106/photo/large-house-with-steep-roof-and-side-entry-three-car-garage.jpg?s=1024x1024&w=is&k=20&c=WEwH-MlAqCy2kSbnaWf1ZQLHhQJHUT3avWrSacFo3Ls=',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://www.google.com/imgres?q=stock%20home%20photos&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F876864896%2Fphoto%2Fluxurious-new-construction-home-in-bellevue-wa.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DY5ZhzHSiyku1N4QGIF5FP4TkVhvEzTkEGSQ4FwZ7nlA%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmodern-house&docid=j94nexNAiyAxxM&tbnid=hTTfXBeG1uOaDM&vet=12ahUKEwjCy4eIyYmJAxWrATQIHQaME-kQM3oECFQQAA..i&w=612&h=408&hcb=2&ved=2ahUKEwjCy4eIyYmJAxWrATQIHQaME-kQM3oECFQQAA',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://www.google.com/imgres?q=stock%20home%20photos&imgurl=https%3A%2F%2Ft3.ftcdn.net%2Fjpg%2F04%2F32%2F56%2F22%2F360_F_432562253_0AJEmoX8idRHQiBDCCgHjdsHUBZG7ppx.jpg&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dhouse&docid=pFjgCxwhb8Q2tM&tbnid=WIakn5oFQiUlOM&vet=12ahUKEwjCy4eIyYmJAxWrATQIHQaME-kQM3oECHkQAA..i&w=504&h=360&hcb=2&ved=2ahUKEwjCy4eIyYmJAxWrATQIHQaME-kQM3oECHkQAA',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dmodern%2Bhome%2Bfor%2Bsale&psig=AOvVaw3LWwA4GiQYiPhLPrTuBZdH&ust=1728847530042000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjrnLXJiYkDFQAAAAAdAAAAABAE',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcreate.vista.com%2Fphotos%2Fhouse%2F&psig=AOvVaw3LWwA4GiQYiPhLPrTuBZdH&ust=1728847530042000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjrnLXJiYkDFQAAAAAdAAAAABAK',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Flarge-flat-grass-lawn.html&psig=AOvVaw3LWwA4GiQYiPhLPrTuBZdH&ust=1728847530042000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjrnLXJiYkDFQAAAAAdAAAAABAP',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fstock-photos-dream-home-image2216213&psig=AOvVaw3LWwA4GiQYiPhLPrTuBZdH&ust=1728847530042000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjrnLXJiYkDFQAAAAAdAAAAABAW',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://www.google.com/imgres?q=stock%20home%20photos&imgurl=https%3A%2F%2Fassets-us-01.kc-usercontent.com%2F28e7bd12-5b30-009d-524e-785407f8bd6e%2F2a2babc3-fc72-437b-98ee-265a0a0702a5%2FSignature-Homes-Hero-2018.jpg%3Fw%3D1600%26h%3D900%26fit%3Dcrop&imgrefurl=https%3A%2F%2Fwww.stockdevelopment.com%2Fprojects%2Fcommunities%2Findex&docid=a0k87wJ1yUSdlM&tbnid=c-8T68Qk5RxAPM&vet=12ahUKEwjCy4eIyYmJAxWrATQIHQaME-kQM3oECHsQAA..i&w=1200&h=675&hcb=2&ved=2ahUKEwjCy4eIyYmJAxWrATQIHQaME-kQM3oECHsQAA',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://www.google.com/imgres?q=stock%20home%20photos&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-photo%2Fecofriendly-home-solar-panels-on-260nw-2475678887.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fhome&docid=QIP-Qwgez8l4FM&tbnid=dSng7a4H02XppM&vet=12ahUKEwjCy4eIyYmJAxWrATQIHQaME-kQM3oECHUQAA..i&w=260&h=280&hcb=2&ved=2ahUKEwjCy4eIyYmJAxWrATQIHQaME-kQM3oECHUQAA',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://www.google.com/imgres?q=stock%20home%20photos&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F023%2F308%2F053%2Fsmall%2Fai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fluxury-house&docid=6WGU7_wfkksS2M&tbnid=wS57blhuY8qA5M&vet=12ahUKEwjCy4eIyYmJAxWrATQIHQaME-kQM3oECHAQAA..i&w=357&h=200&hcb=2&ved=2ahUKEwjCy4eIyYmJAxWrATQIHQaME-kQM3oECHAQAA',
        preview: true,
      },
      {
        spotId: 13,
        url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F022%2F880%2F529%2Fsmall%2Fai-generative-3d-modern-luxury-real-estate-house-for-sale-and-rent-luxury-property-concept-photo.jpg&tbnid=rlXZ-_jC0EZeKM&vet=10CAIQxiAoAGoXChMImOuctcmJiQMVAAAAAB0AAAAAECI..i&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fmodern-house&docid=wtQ1ZFrhaerFuM&w=357&h=200&itg=1&q=stock%20home%20photos&ved=0CAIQxiAoAGoXChMImOuctcmJiQMVAAAAAB0AAAAAECI',
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
