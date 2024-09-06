const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
  const currUser = req.user.id;
  const userSpots = await Spot.findAll({ where: { userId: currUser }});

  res.json(userSpots);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const getSpot = await Spot.findOne({ 
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'] // Specify which attributes to include from the User model
        },
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview']
        }
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
  const getSpots = await Spot.findAll();

  res.json(getSpots);
});

router.post('/', requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const userId = req.user.id;

  const newSpot = Spot.create({ userId, address, city, state, country, lat, lng, name, description, price });

  res.send(newSpot);
});

module.exports = router;
