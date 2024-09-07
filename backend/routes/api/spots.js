const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { Spot, sequelize, User, SpotImage, Review } = require('../../db/models');
const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const currUser = req.user.id;

    const userSpots = await Spot.findAll({
      where: { userId: currUser },
      attributes: [
        'id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
        [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews']
      ],
      include: [{
        model: Review,
        attributes: []
      }],
      group: ['Spot.id']
    });

    if (userSpots.length === 0) {
      return res.json({ message: "User has no spots." });
    }

    const formattedSpots = userSpots.map(spot => ({
      id: spot.id,
      userId: spot.userId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgStarRating: spot.avgStarRating ? parseFloat(spot.avgStarRating) : null,
      numReviews: spot.numReviews ? parseInt(spot.numReviews, 10) : 0
    }));

    res.json(formattedSpots);
  } catch (error) {
    next(error); 
  }
});

router.get('/', async (req, res, next) => {
  try {
    let { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    page = parseInt(page);
    size = parseInt(size);
    minLat = minLat ? parseFloat(minLat) : undefined;
    maxLat = maxLat ? parseFloat(maxLat) : undefined;
    minLng = minLng ? parseFloat(minLng) : undefined;
    maxLng = maxLng ? parseFloat(maxLng) : undefined;
    minPrice = minPrice ? parseFloat(minPrice) : undefined;
    maxPrice = maxPrice ? parseFloat(maxPrice) : undefined;

    const errors = {};
    if (page < 1 || size < 1 || size > 100) {
      errors.page = 'Page must be greater than or equal to 1, and size must be between 1 and 100';
    }
    if ((minLat && isNaN(minLat)) || (maxLat && isNaN(maxLat))) {
      errors.lat = 'Latitude must be a valid number';
    }
    if ((minLng && isNaN(minLng)) || (maxLng && isNaN(maxLng))) {
      errors.lng = 'Longitude must be a valid number';
    }
    if ((minPrice && isNaN(minPrice)) || (maxPrice && isNaN(maxPrice)) || minPrice < 0 || maxPrice < 0) {
      errors.price = 'Price must be a positive number';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: 'Bad Request',
        errors
      });
    }

    const where = {};
    if (minLat) where.lat = { [sequelize.Op.gte]: minLat };
    if (maxLat) where.lat = { ...where.lat, [sequelize.Op.lte]: maxLat };
    if (minLng) where.lng = { [sequelize.Op.gte]: minLng };
    if (maxLng) where.lng = { ...where.lng, [sequelize.Op.lte]: maxLng };
    if (minPrice) where.price = { [sequelize.Op.gte]: minPrice };
    if (maxPrice) where.price = { ...where.price, [sequelize.Op.lte]: maxPrice };

    const spots = await Spot.findAll({
      where,
      limit: size,
      offset: (page - 1) * size,
      attributes: [
        'id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']
      ],
      include: [
        {
          model: Review,
          attributes: [],
        },
        {
          model: SpotImage,
          attributes: [['url', 'previewImage']],
          where: { preview: true },
          required: false
        }
      ],
      group: ['Spot.id']
    });

    if (!spots.length) {
      return res.json({ message: "No spots found." });
    }

    const formattedSpots = spots.map(spot => {
      const previewImage = spot.SpotImages.length > 0 ? spot.SpotImages[0].previewImage : null;

      return {
        id: spot.id,
        ownerId: spot.userId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgStarRating: spot.avgStarRating ? parseFloat(spot.avgStarRating) : null,
        previewImage
      };
    });

    res.json({
      Spots: formattedSpots,
      page,
      size
    });
    
  } catch (error) {
    next(error); 
  }
});

router.get('/:spotId', async (req, res, next) => {
  const { spotId } = req.params;

  try {
    const getSpot = await Spot.findByPk(spotId, {
      attributes: [
        'id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'], [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews']
      ],
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
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    res.json(getSpot);
  } catch (error) {
    next(error); 
  }
});

router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll({
      attributes: [
        'id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']
      ],
      include: [
        {
          model: Review,
          attributes: [],
        },
        {
          model: SpotImage,
          attributes: [['url', 'previewImage']],
          where: { preview: true },
          required: false 
        }
      ],
      group: ['Spot.id'] 
    });

    if (spots.length === 0) {
      return res.json({ message: "No spots found." });
    }

    const formattedSpots = spots.map(spot => {
      const previewImage = spot.SpotImages.length > 0 ? spot.SpotImages[0].previewImage : null;

      return {
        id: spot.id,
        userId: spot.userId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgStarRating: spot.avgStarRating ? parseFloat(spot.avgStarRating) : null,
        previewImage
      };
    });

    res.json(formattedSpots);
  } catch (error) {
    next(error); 
  }
});

router.get('/spots/:spotId/bookings', requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    const isOwner = spot.ownerId === userId;

    const bookings = await Booking.findAll({
      where: { spotId },
      include: isOwner ? [{ model: User, attributes: ['id', 'firstName', 'lastName'] }] : []
    });

    const formattedBookings = bookings.map(booking => {
      if (isOwner) {

          return {
          id: booking.id,
          spotId: booking.spotId,
          userId: booking.userId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
          User: booking.User ? {
            id: booking.User.id,
            firstName: booking.User.firstName,
            lastName: booking.User.lastName
          } : null
        };
      } else {

        return {
          spotId: booking.spotId,
          startDate: booking.startDate,
          endDate: booking.endDate
        };
      }
    });

    return res.status(200).json({ Bookings: formattedBookings });
    
  } catch (error) {
    next(error);
  }
});

router.post('/:spotId/images', async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const { url, preview } = req.body;

    if (!url || typeof preview !== 'boolean') {
      return res.status(400).json({
        message: "Bad Request",
        errors: {
          url: "URL is required",
          preview: "Preview must be a boolean value"
        }
      });
    }

    const spot = await Spot.findByPk(id);
    if (!spot) {
      return res.status(404).json({ message: "Spot not found." });
    }

    const newImage = await SpotImage.create({ spotId: spotId, url, preview });

    res.status(201).json({
      message: "Image added successfully.",
      image: newImage
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});

      return res.status(400).json({
        message: "Validation error",
        errors: validationErrors
      });
    }

    next(error);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const errors = {};

    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!country) errors.country = "Country is required";
    if (lat === undefined || lat < -90 || lat > 90) errors.lat = "Latitude must be within -90 and 90";
    if (lng === undefined || lng < -180 || lng > 180) errors.lng = "Longitude must be within -180 and 180";
    if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
    if (!description) errors.description = "Description is required";
    if (price === undefined || price <= 0) errors.price = "Price per day must be a positive number";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Bad Request",
        errors
      });
    }

    const newSpot = await Spot.create({ userId: req.user.id, address, city, state, country, lat, lng, name, description, price });

    res.status(201).json({
      message: 'Spot created successfully.',
      spot: newSpot
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      
      return res.status(400).json({
        message: "Validation error",
        errors: validationErrors
      });
    }

    next(error);
  }
});

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    let errors = {};

    if (!review || typeof review !== 'string' || review.trim() === '') {
      errors.review = 'Review text is required';
    }
    if (stars === undefined || !Number.isInteger(stars) || stars < 1 || stars > 5) {
      errors.stars = 'Stars must be an integer from 1 to 5';
    }

    const existingReview = await Review.findOne({
      where: {
        userId: userId,
        spotId: spotId
      }
    })

    if (existingReview) {
      return res.status(500).json({
        message: "User already has a review for this spot",
      });
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: 'Bad Request',
        errors
      });
    }

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars
    });

    res.status(201).json({
      id: newReview.id,
      userId: newReview.userId,
      spotId: newReview.spotId,
      review: newReview.review,
      stars: newReview.stars,
      createdAt: newReview.createdAt,
      updatedAt: newReview.updatedAt
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {})
      });
    }
    next(error);
  }
});

router.put('/:spotId', requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    } = req.body;

    const errors = {};
    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!country) errors.country = "Country is required";
    if (lat === undefined || lat < -90 || lat > 90) errors.lat = "Latitude must be within -90 and 90";
    if (lng === undefined || lng < -180 || lng > 180) errors.lng = "Longitude must be within -180 and 180";
    if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
    if (!description) errors.description = "Description is required";
    if (price === undefined || price <= 0) errors.price = "Price per day must be a positive number";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Bad Request",
        errors
      });
    }

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found." });
    }

    await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });

    res.status(200).json({
      message: 'Spot updated successfully.',
      spot
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});

      return res.status(400).json({
        message: "Validation error",
        errors: validationErrors
      });
    }

    next(error);
  }
});

router.delete('/:spotId', requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: 'Spot not found' });
    }

    if (spot.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await spot.destroy();

    res.status(200).json({ message: 'Spot deleted successfully' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:spotId/images/:imageId', requireAuth, async (req, res, next) => {
  try {
    const { spotId, imageId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const image = await SpotImage.findOne({
      where: { id: imageId, spotId: spotId }
    });

    if (!image) {
      return res.status(404).json({ message: "Image couldn't be found" });
    }

    await image.destroy();

    res.status(200).json({ message: 'Image deleted successfully' });

  } catch (error) {
    next(error);
  }
});



module.exports = router;
