const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { User, Review, Spot, sequelize, SpotImage, ReviewImage } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
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

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId);
    const reviewImages = await ReviewImage.findAll({ where: { reviewId: reviewId }});

    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found"
      });
    }

    // if (review.userId !== req.user.id) {
    //   return res.status(403).json({
    //     message: "Forbidden"
    //   });
    // }

    if (reviewImages.length >= 10) {
      return res.status(403).json({
        message: "Maximum number of images for this resource was reached"
      });
    }

    const addImage = await ReviewImage.create({
      userId: req.user.id,
      reviewId: reviewId,
      url: url
    })

    res.status(201).json(addImage);

  } catch(error) {
    next(error);
  }
});

router.put('/:reviewId', requireAuth, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { review, stars } = req.body;
    const errors = {};

    if (!review || typeof review !== 'string') {
      errors.review = 'Review text is required';
    }

    if (typeof stars !== 'number' || stars < 1 || stars > 5) {
      errors.stars = 'Stars must be an integer from 1 to 5';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: errors
      });
    }

    const existingReview = await Review.findByPk(reviewId);
    if (!existingReview) {
      return res.status(404).json({
        message: "Review couldn't be found"
      });
    }

    // if (existingReview.userId !== req.user.id) {
    //   return res.status(403).json({
    //     message: 'Forbidden'
    //   });
    // }

    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();

    res.status(200).json(existingReview);

  } catch (error) {
    next(error);
  }
});

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found"
      });
    }

    // if (review.userId !== req.user.id) {
    //   return res.status(403).json({
    //     message: 'Forbidden'
    //   });
    // }

    await ReviewImage.destroy({ where: { reviewId } });

    await review.destroy();

    res.status(200).json({
      message: 'Successfully deleted'
    });

  } catch (error) {
    next(error);
  }
});


module.exports = router;