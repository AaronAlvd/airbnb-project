const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { Spot, sequelize, User, SpotImage, Review } = require('../../db/models');
const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
  const currUser = req.user.id;
  const userSpots = await Spot.findAll({ 
    where: { userId: currUser },
    attributes: [
      'id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
      [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'], [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews']
    ]
  });

  res.json(userSpots);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const getSpot = await Spot.findOne({
      attributes: [
        'id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'], [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews']
      ],
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'] 
        },
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview']
        },
        {
          model: Review,
          attributes: [],
        },
      ] 
    });

    if (!getSpot) {
      return res.status(404).json({ message: 'Spot not found' });
    }

    res.json(getSpot);
  } catch (error) {
    next(error); 
  }
});

router.get('/', async (req, res, next) => {
  const getSpots = await Spot.findAll({
    attributes: [
      'id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
      [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating'], 
    ],
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: [['url', 'previewImage']],
        where: { preview: true }
      }
    ]
  });

  res.json(getSpots);
});

router.post('/', requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const userId = req.user.id;

  const newSpot = Spot.create({ userId, address, city, state, country, lat, lng, name, description, price });

  res.send(newSpot);
});

module.exports = router;
