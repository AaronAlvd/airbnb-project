'use strict';

const { Spot } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        id: 1,
        userId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: `Each meticulously curated home in our Airbnb-inspired platform offers a welcoming sanctuary for travelers and explorers 
                      alike, designed to blend modern comforts with local charm. From cozy urban lofts adorned with contemporary art and skyline 
                      views to rustic countryside cottages nestled among rolling hills and vineyards, every residence promises a unique and 
                      immersive experience. Discover spaces thoughtfully furnished for relaxation and productivity, whether you seek a bustling 
                      city center retreat or a tranquil escape off the beaten path. Each home is a testament to our commitment to providing 
                      unforgettable stays where comfort meets adventure.`,
        price: 123,
      },
      {
        id: 2,
        userId: 2,
        address: "456 Hollywood Blvd",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.092809,
        lng: -118.328661,
        name: "Code Camp",
        description: `Each meticulously curated home in our Airbnb-inspired platform offers a welcoming sanctuary for travelers and explorers 
                      alike, designed to blend modern comforts with local charm. From cozy urban lofts adorned with contemporary art and skyline 
                      views to rustic countryside cottages nestled among rolling hills and vineyards, every residence promises a unique and 
                      immersive experience. Discover spaces thoughtfully furnished for relaxation and productivity, whether you seek a bustling 
                      city center retreat or a tranquil escape off the beaten path. Each home is a testament to our commitment to providing 
                      unforgettable stays where comfort meets adventure.`,
        price: 456
      },
      {
        id: 3,
        userId: 3,
        address: "789 Innovation Drive",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 47.609722,
        lng: -122.333056,
        name: "Tech University",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 789
      },
      {
        id: 4,
        userId: 4,
        address: "321 Developer Way",
        city: "Austin",
        state: "Texas",
        country: "United States of America",
        lat: 30.267153,
        lng: -97.743057,
        name: "Fullstack Academy",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 350,
      },
      {
        id: 5,
        userId: 5,
        address: "654 Silicon Street",
        city: "San Jose",
        state: "California",
        country: "United States of America",
        lat: 37.338208,
        lng: -121.886329,
        name: "Silicon Valley University",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 650,
      },
      {
        id: 6,
        userId: 6,
        address: "987 Learn Lane",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.712776,
        lng: -74.005974,
        name: "NYC Tech School",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 800,
      },
      {
        id: 7,
        userId: 7,
        address: "111 Code Ave",
        city: "Chicago",
        state: "Illinois",
        country: "United States of America",
        lat: 41.878113,
        lng: -87.629799,
        name: "Chicago Coding Institute",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 450,
      },
      {
        id: 8,
        userId: 8,
        address: "222 Engineer St",
        city: "Boston",
        state: "Massachusetts",
        country: "United States of America",
        lat: 42.360081,
        lng: -71.058884,
        name: "Boston Engineering Academy",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 600,
      },
      {
        id: 9,
        userId: 9,
        address: "333 Data Dr",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 39.739236,
        lng: -104.990251,
        name: "Data Science School",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 700,
      },
      {
        id: 10,
        userId: 10,
        address: "444 Cloud St",
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 25.7617,
        lng: -80.1918,
        name: "Cloud Computing Academy",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 750,
      },
      {
        id: 11,
        userId: 11,
        address: "555 AI Blvd",
        city: "Atlanta",
        state: "Georgia",
        country: "United States of America",
        lat: 33.7490,
        lng: -84.3880,
        name: "AI Development Institute",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 900,
      },
      {
        id: 12,
        userId: 12,
        address: "666 Cybersecurity Way",
        city: "Washington",
        state: "D.C.",
        country: "United States of America",
        lat: 38.9072,
        lng: -77.0369,
        name: "Cybersecurity Academy",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 850,
      },
      {
        id: 13,
        userId: 13,
        address: "777 Game Dev St",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.0522,
        lng: -118.2437,
        name: "Game Development School",
        description: `Our university stands at the forefront of innovation, dedicated to empowering the next generation of leaders in 
                      technology and beyond. Nestled in a vibrant academic community, our campus offers state-of-the-art facilities and 
                      collaborative spaces designed to foster creativity and hands-on learning. From pioneering research labs pushing 
                      the boundaries of artificial intelligence and sustainable technologies to dynamic classrooms where theory meets 
                      practice, students immerse themselves in a transformative educational experience. Our diverse faculty of industry 
                      experts and scholars guides students through rigorous academic programs, equipping them with the skills and knowledge 
                      to tackle global challenges and drive future innovations. Join us at the intersection of knowledge and discovery,
                      where passion for cutting-edge technology fuels limitless possibilities.`,
        price: 999,
      },
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
