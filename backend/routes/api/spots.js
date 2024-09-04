const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { Spot } = require('../../db/models');
const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
  const currUser = req.user;

  res.json(currUser);
});


router.get('/', async (req, res, next) => {
  // return the spots information. 
});

router.post('/', requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const userId = req.user.id;

  const newSpot = Spot.create({ userId, address, city, state, country, lat, lng, name, description, price });

  res.json(newSpot);
});

module.exports = router;
