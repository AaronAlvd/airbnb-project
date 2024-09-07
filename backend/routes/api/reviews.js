const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { User, Review, Spot, sequelize, SpotImage } = require('../../db/models');

const router = express.Router();

router.get('/reviews/current', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.findAll({
      where: { userId },
      include: [
        {
          model: Spot,
          attributes: [
            'id', 
            'userId', 
            'address', 
            'city', 
            'state', 
            'country', 
            'lat', 
            'lng', 
            'name', 
            'description', 
            'price'
          ],
          include: [
            {
              model: SpotImage,
              attributes: [['url', 'previewImage']],
              where: { preview: true }, 
              required: false
            }
          ]
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        },
        {
          model: User, 
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    const formattedReviews = reviews.map(review => {
      const previewImage = review.Spot.SpotImages.find(image => image.previewImage) || {};

      return {
        id: review.id,
        userId: review.userId,
        spotId: review.spotId,
        review: review.review,
        stars: review.stars,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        User: review.User,
        Spot: {
          id: review.Spot.id,
          ownerId: review.Spot.userId,
          address: review.Spot.address,
          city: review.Spot.city,
          state: review.Spot.state,
          country: review.Spot.country,
          lat: review.Spot.lat,
          lng: review.Spot.lng,
          name: review.Spot.name,
          description: review.Spot.description,
          price: review.Spot.price,
          previewImage: previewImage.previewImage || null
        },
        ReviewImages: review.ReviewImages.map(image => ({
          id: image.id,
          url: image.url
        }))
      };
    });

    res.status(200).json({ Reviews: formattedReviews });
  } catch (error) {
    next(error);
  }
});


module.exports = router;