'use strict';

const { Review } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await Review.bulkCreate([
      {
        review: "Staying at App Academy was a wonderful experience. The location in San Francisco was perfect for our tech-centric vacation, and the home itself was both modern and cozy. We especially loved the city views from the living room. Will definitely return!",
        userId: 4,
        spotId: 1,
        stars: 5
      },
      {
        review: "The App Academy spot was a great choice for our visit. It’s located near all the tech hubs, and the space was clean and well-designed. However, the price was a bit steep for the size of the property.",
        userId: 5,
        spotId: 1,
        stars: 4
      },
      {
        review: "Comfortable stay at App Academy with great attention to detail. The neighborhood was a bit noisy, but overall, it was a good experience for our stay in San Francisco.",
        userId: 6,
        spotId: 1,
        stars: 4
      },
      {
        review: "Code Camp was a fantastic spot for our short trip to LA. It’s in a prime location, and the space was comfortable and modern. Highly recommend it for tech enthusiasts visiting the city.",
        userId: 1,
        spotId: 2,
        stars: 5
      },
      {
        review: "Great stay at Code Camp. The property is beautifully maintained and close to many attractions in Los Angeles. However, parking was a bit tricky in the area.",
        userId: 7,
        spotId: 2,
        stars: 4
      },
      {
        review: "Nice spot, but the price was a bit high for what was offered. The amenities were good, but the check-in process was a bit delayed. Overall, a pleasant experience.",
        userId: 8,
        spotId: 2,
        stars: 3
      },
      {
        review: "Tech University provided a clean and well-furnished space during our stay in Seattle. The location is great, and it’s close to tech centers and attractions. Would definitely stay again.",
        userId: 9,
        spotId: 3,
        stars: 5
      },
      {
        review: "Amazing stay at Tech University! The place was spacious, and we enjoyed the quiet neighborhood. The price was worth the comfort and amenities provided.",
        userId: 10,
        spotId: 3,
        stars: 5
      },
      {
        review: "Good stay, but the WiFi was a bit spotty. Everything else was as described, and the host was responsive to our needs. Overall, a solid experience in Seattle.",
        userId: 11,
        spotId: 3,
        stars: 4
      },
      {
        review: "Fullstack Academy was a great stay. The location in Austin was ideal for exploring the city, and the space was clean and modern. The host was responsive and helpful.",
        userId: 1,
        spotId: 4,
        stars: 5
      },
      {
        review: "The property was nice, but the air conditioning could have been better. It’s Austin, so it gets pretty hot! Overall, the stay was comfortable.",
        userId: 2,
        spotId: 4,
        stars: 3
      },
      {
        review: "I enjoyed my time at Fullstack Academy. The space was thoughtfully designed, and the neighborhood was quiet but close to downtown Austin. Highly recommend!",
        userId: 5,
        spotId: 4,
        stars: 4
      },
      {
        review: "Our stay at Silicon Valley University was excellent. The home was cozy, and the proximity to tech centers in San Jose made it a convenient spot for our trip.",
        userId: 6,
        spotId: 5,
        stars: 5
      },
      {
        review: "Silicon Valley University provided a great stay, but the neighborhood was a little busy at night. Still, the interior was fantastic, and the host was accommodating.",
        userId: 9,
        spotId: 5,
        stars: 4
      },
      {
        review: "Nice property, but the price was on the higher end. We had a comfortable stay, though, and the location was perfect for tech professionals visiting San Jose.",
        userId: 12,
        spotId: 5,
        stars: 4
      },
      {
        review: "Absolutely loved staying at NYC Tech School. The home was beautifully designed, and the location in New York was unbeatable. Will definitely book again!",
        userId: 4,
        spotId: 6,
        stars: 5
      },
      {
        review: "Good experience overall. The property was clean and modern, but it was a bit noisy due to the busy area in New York. Still, it was a pleasant stay.",
        userId: 10,
        spotId: 6,
        stars: 4
      },
      {
        review: "Nice spot, but the check-in process took longer than expected. Other than that, the place was well-maintained, and the host was responsive.",
        userId: 8,
        spotId: 6,
        stars: 3
      },
      {
        review: "Chicago Coding Institute was an excellent choice for our stay. The home was cozy, and we loved how close it was to downtown Chicago. Highly recommend!",
        userId: 11,
        spotId: 7,
        stars: 5
      },
      {
        review: "Good stay overall, but the WiFi was a bit slow. The home was clean, and the host was accommodating. A nice option for anyone visiting Chicago.",
        userId: 3,
        spotId: 7,
        stars: 4
      },
      {
        review: "The property was well-maintained and located in a quiet neighborhood. However, the parking situation wasn’t ideal. Aside from that, it was a pleasant stay.",
        userId: 6,
        spotId: 7,
        stars: 4
      },
      {
        review: "We had a fantastic stay at Boston Engineering Academy! The place was clean, spacious, and well-located in Boston. Would definitely recommend it to others.",
        userId: 9,
        spotId: 8,
        stars: 5
      },
      {
        review: "The space was nice and modern, but we found it a bit overpriced for the size. Overall, it was a good stay, and the host was friendly and responsive.",
        userId: 7,
        spotId: 8,
        stars: 4
      },
      {
        review: "Great stay! The place was exactly as described, and the location was perfect for exploring Boston. We enjoyed the comfortable and quiet space.",
        userId: 2,
        spotId: 8,
        stars: 5
      },
      {
        review: "Our stay at Data Science School in Denver was amazing. The home was modern and well-designed, and the location was ideal for exploring the city.",
        userId: 1,
        spotId: 9,
        stars: 5
      },
      {
        review: "Nice place, but the heating system didn’t work as well as we hoped. The interior was clean and comfortable, and the host was very responsive.",
        userId: 4,
        spotId: 9,
        stars: 3
      },
      {
        review: "The property was great for our needs, but the neighborhood was a little noisy. Aside from that, it was a pleasant stay, and the amenities were as advertised.",
        userId: 8,
        spotId: 9,
        stars: 4
      },
      {
        review: "Cloud Computing Academy was an exceptional place to stay. The property was modern, clean, and perfectly located for our trip to Miami. Will definitely return!",
        userId: 12,
        spotId: 10,
        stars: 5
      },
      {
        review: "Beautiful property with all the amenities we needed for our Miami vacation. The neighborhood was a bit busy, but overall, it was a great experience.",
        userId: 3,
        spotId: 10,
        stars: 4
      },
      {
        review: "We enjoyed our stay at Cloud Computing Academy. The property was clean and well-designed, though the price was a bit higher than expected.",
        userId: 5,
        spotId: 10,
        stars: 4
      },
      {
        review: "AI Development Institute was the perfect spot for our visit to Atlanta. The home was spacious and modern, and the location was ideal for exploring the city.",
        userId: 9,
        spotId: 11,
        stars: 5
      },
      {
        review: "Nice place, but the neighborhood was a bit noisy at night. The property itself was comfortable and well-maintained, and the host was very helpful.",
        userId: 7,
        spotId: 11,
        stars: 4
      },
      {
        review: "We had a good stay at AI Development Institute. The space was clean and modern, though the check-in process could have been a bit smoother.",
        userId: 6,
        spotId: 11,
        stars: 4
      },
      {
        review: "Cybersecurity Academy was a fantastic place to stay. The property was clean and well-located in D.C., making it easy to explore the city. Highly recommend!",
        userId: 11,
        spotId: 12,
        stars: 5
      },
      {
        review: "The space was great, but the price was a little steep. Still, we had a comfortable stay, and the amenities were as described. The host was responsive.",
        userId: 3,
        spotId: 12,
        stars: 4
      },
      {
        review: "Good stay overall, but the property felt a bit smaller than expected. The location, however, was perfect for our D.C. trip. The host was very accommodating.",
        userId: 8,
        spotId: 12,
        stars: 3
      },
      {
        review: "Game Development School was a perfect stay. The property was well-designed, and the location in Los Angeles made it easy to get around. Would definitely stay again!",
        userId: 10,
        spotId: 13,
        stars: 5
      },
      {
        review: "Great spot with modern amenities. However, the price was a bit high for the size of the home. Aside from that, it was a comfortable and enjoyable stay.",
        userId: 5,
        spotId: 13,
        stars: 4
      },
      {
        review: "We had a nice stay at Game Development School. The place was clean, and the host was responsive. The price was on the high end, but the experience was good overall.",
        userId: 9,
        spotId: 13,
        stars: 4
      }
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