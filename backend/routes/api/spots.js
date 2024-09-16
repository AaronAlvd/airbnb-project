const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { Op } = require('sequelize');
const { Spot, sequelize, User, ReviewImage, SpotImage, Review, Booking } = require('../../db/models');
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

    const formattedSpots = { Spots: userSpots.map(spot => ({
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
    }))};

    res.json(formattedSpots);
  } catch (error) {
    next(error); 
  }
});

router.get('/:spotId/reviews', async (req, res, next) => {
  const { spotId } = req.params;

  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url'],
        },
      ],
    });

    const formattedReviews = reviews.map((review) => {
      return {
        id: review.id,
        userId: review.userId,
        spotId: review.spotId,
        review: review.review,
        stars: review.stars,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        User: {
          id: review.User.id,
          firstName: review.User.firstName,
          lastName: review.User.lastName,
        },
        ReviewImages: review.ReviewImages.map((image) => ({
          id: image.id,
          url: image.url,
        })),
      };
    });

    return res.status(200).json({
      Reviews: formattedReviews,
    });
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

    const isOwner = spot.userId === userId;

    const bookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      include: isOwner ? [{ model: User, attributes: ['id', 'firstName', 'lastName'] }] : []
    });

    if (isOwner) {
      res.status(200).json({
        Bookings: bookings
      });
    } else {
      const simplifiedBookings = bookings.map(booking => ({
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate
      }));
      res.status(200).json({
        Bookings: simplifiedBookings
      });
    }

  } catch (error) {
    next(error);
  }
});

router.get('/:spotId', async (req, res, next) => {

  try {
    const { spotId } = req.params;
    const spotExists = await Spot.findByPk(spotId)

    if (!spotExists) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const getSpot = await Spot.findOne({
      where: { id: spotId},
      attributes: [
        'id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'], [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews']
      ],
      include: [
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'] 
        },
        {
          model: Review,
          attributes: [],
        },
      ] 
    });

    res.json(getSpot);
  } catch (error) {
    next(error); 
  }
});

router.get('/', async (req, res, next) => {
  try {
    const errors = {};

    // Parse and validate query parameters
    const page = parseInt(req.query.page, 10) || 1;
    if (isNaN(page) || page < 1) {
      errors.page = 'Page must be greater than or equal to 1';
    }

    const size = parseInt(req.query.size, 10) || 20;
    if (isNaN(size) || size < 1 || size > 20) {
      errors.size = 'Size must be between 1 and 20';
    }

    if (req.query.minLat && isNaN(parseFloat(req.query.minLat))) {
      errors.minLat = 'Minimum latitude is invalid';
    }
    if (req.query.maxLat && isNaN(parseFloat(req.query.maxLat))) {
      errors.maxLat = 'Maximum latitude is invalid';
    }
  
    if (req.query.minLng && isNaN(parseFloat(req.query.minLng))) {
      errors.minLng = 'Minimum longitude is invalid';
    }
    if (req.query.maxLng && isNaN(parseFloat(req.query.maxLng))) {
      errors.maxLng = 'Maximum longitude is invalid';
    }
  
    if (req.query.minPrice && (isNaN(parseFloat(req.query.minPrice)) || parseFloat(req.query.minPrice) < 0)) {
      errors.minPrice = 'Minimum price must be greater than or equal to 0';
    }
    if (req.query.maxPrice && (isNaN(parseFloat(req.query.maxPrice)) || parseFloat(req.query.maxPrice) < 0)) {
      errors.maxPrice = 'Maximum price must be greater than or equal to 0';
    }

    // If any validation errors exist, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: errors
      });
    }

    // Filter conditions based on query parameters
    const filterConditions = {};
    if (req.query.minLat) filterConditions.lat = { [Op.gte]: parseFloat(req.query.minLat) };
    if (req.query.maxLat) filterConditions.lat = { ...filterConditions.lat, [Op.lte]: parseFloat(req.query.maxLat) };
    if (req.query.minLng) filterConditions.lng = { [Op.gte]: parseFloat(req.query.minLng) };
    if (req.query.maxLng) filterConditions.lng = { ...filterConditions.lng, [Op.lte]: parseFloat(req.query.maxLng) };
    if (req.query.minPrice) filterConditions.price = { [Op.gte]: parseFloat(req.query.minPrice) };
    if (req.query.maxPrice) filterConditions.price = { ...filterConditions.price, [Op.lte]: parseFloat(req.query.maxPrice) };

    // Query spots with filtering, average rating, and preview image
    const spots = await Spot.findAll({
      where: filterConditions,
      attributes: [
        'id', 'userId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating']
      ],
      include: [
        {
          model: Review,
          attributes: [], // Only calculate the average rating, no need to include fields
        },
        {
          model: SpotImage,
          attributes: [['url', 'previewImage']], // Fetch the preview image URL
          where: { preview: true },
          required: false // Include spots even if they have no preview image
        }
      ],
      group: ['Spot.id', 'SpotImages.id'], // Group by Spot.id and SpotImages.id to avoid SQL error
    });

    // If no spots are found, return a message
    if (spots.length === 0) {
      return res.json({ message: "No spots found." });
    }

    // Format the response for each spot
    const formattedSpots = {
      Spots: spots.map(spot => {
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
          avgRating: spot.avgStarRating ? parseFloat(spot.avgStarRating) : null,
          previewImage
        };
      })
    };
    
    // Return the formatted spots in the response
    res.json(formattedSpots);
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
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

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found." });
    }

    const newImage = await SpotImage.create({ spotId: spotId, url, preview });

    res.status(201).json({
      message: "Image added successfully.",
      image: {
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
      }
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
    });

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

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;

    // Ensure dates are in proper format
    const start = new Date(startDate);
    const end = new Date(endDate);

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId === userId) {
      return res.status(403).json({ message: "You cannot book your own spot" });
    }

    // Check for conflicting bookings
    const existingBooking = await Booking.findOne({
      where: {
        spotId: spotId,
        [Op.or]: [
          {
            startDate: { [Op.between]: [start, end] }
          },
          {
            endDate: { [Op.between]: [start, end] }
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: start } },
              { endDate: { [Op.gte]: end } }
            ]
          }
        ]
      }
    });

    if (existingBooking) {
      return res.status(403).json({
        message: "Booking already exists for the spot on the selected dates"
      });
    }

    // Create new booking
    const newBooking = await Booking.create({
      userId,
      spotId,
      startDate: start,
      endDate: end
    });

    return res.status(201).json({
      id: newBooking.id,
      userId: newBooking.userId,
      spotId: newBooking.spotId,
      startDate: newBooking.startDate,
      endDate: newBooking.endDate,
      createdAt: newBooking.createdAt,
      updatedAt: newBooking.updatedAt
    });
    
  } catch (error) {
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
    // if (error.name === 'SequelizeValidationError') {
    //   const validationErrors = error.errors.reduce((acc, err) => {
    //     acc[err.path] = err.message;
    //     return acc;
    //   }, {});
      
    //   return res.status(400).json({
    //     message: "Validation error",
    //     errors: validationErrors
    //   });
    // }

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

    // if (spot.userId !== req.user.id) {
    //   return res.status(403).json({
    //     message: "Forbidden: You are not the owner of this spot."
    //   });
    // }

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
  const { spotId } = req.params;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: 'Spot not found' });
    }

    // if (spot.userId !== req.user.id) {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }

    const transaction = await sequelize.transaction();

    try {
      await SpotImage.destroy({ where: { spotId }, transaction });
      await Review.destroy({ where: { spotId }, transaction });
      await Booking.destroy({ where: { spotId }, transaction });

      await spot.destroy({ transaction });

      await transaction.commit();
      res.status(200).json({ message: 'Spot deleted successfully' });
    } catch (error) {
      await transaction.rollback();
      throw error; 
    }
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      res.status(400).json({ message: 'Foreign key constraint error: unable to delete spot with related records' });
    } else {
      console.error('Error deleting spot:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

module.exports = router;
