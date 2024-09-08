const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { Spot, Booking, SpotImage, sequelize } = require('../../db/models');

const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.findAll({
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
            'price'
          ],
          include: [
            {
              model: SpotImage,
              attributes: [['url', 'previewImage']],
              where: { preview: true },
              required: false  // Include even if no preview image exists
            }
          ]
        }
      ]
    });

    const formattedBookings = bookings.map(booking => {
      const spot = booking.Spot;
      const previewImage = spot.SpotImages.length > 0 ? spot.SpotImages[0].previewImage : null;

      return {
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        Spot: {
          id: spot.id,
          ownerId: spot.userId,
          address: spot.address,
          city: spot.city,
          state: spot.state,
          country: spot.country,
          lat: spot.lat,
          lng: spot.lng,
          name: spot.name,
          price: spot.price,
          previewImage
        }
      };
    });

    return res.status(200).json({ Bookings: formattedBookings });
    
  } catch (error) {
    next(error);
  }
});
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId === userId) {
      return res.status(403).json({
        message: "You cannot book your own spot"
      });
    }

    const existingBooking = await Booking.findOne({
      where: {
        spotId: spotId,
        [sequelize.Op.or]: [
          {
            startDate: { [sequelize.Op.between]: [startDate, endDate] }
          },
          {
            endDate: { [sequelize.Op.between]: [startDate, endDate] }
          },
          {
            [sequelize.Op.and]: [
              { startDate: { [sequelize.Op.lte]: startDate } },
              { endDate: { [sequelize.Op.gte]: endDate } }
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

    const newBooking = await Booking.create({
      userId,
      spotId,
      startDate,
      endDate
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

router.put('/bookings/:bookingId', requireAuth, async (req, res, next) => {
    try {
      const { bookingId } = req.params;
      const { startDate, endDate } = req.body;
      const userId = req.user.id;
  
      const booking = await Booking.findByPk(bookingId, {
        include: {
          model: Spot,
          attributes: ['id', 'ownerId']  // Include the spot's ownerId for future authorization checks if needed
        }
      });
  
      if (!booking) {
        return res.status(404).json({
          message: "Booking couldn't be found"
        });
      }
  
      if (booking.userId !== userId) {
        return res.status(403).json({
          message: 'Forbidden: You cannot edit this booking'
        });
      }
  
      const currentDate = new Date();
      if (new Date(booking.endDate) < currentDate) {
        return res.status(400).json({
          message: "Past bookings cannot be edited"
        });
      }
  
      const existingBooking = await Booking.findOne({
        where: {
          spotId: booking.spotId,
          id: { [sequelize.Op.ne]: bookingId },  // Exclude current booking from the check
          [sequelize.Op.or]: [
            {
              startDate: { [sequelize.Op.between]: [startDate, endDate] }
            },
            {
              endDate: { [sequelize.Op.between]: [startDate, endDate] }
            },
            {
              [sequelize.Op.and]: [
                { startDate: { [sequelize.Op.lte]: startDate } },
                { endDate: { [sequelize.Op.gte]: endDate } }
              ]
            }
          ]
        }
      });
  
      if (existingBooking) {
        return res.status(403).json({
          message: "Another booking already exists for the spot on the selected dates"
        });
      }
  
      booking.startDate = startDate;
      booking.endDate = endDate;
      await booking.save();
  
      return res.status(200).json({
        id: booking.id,
        userId: booking.userId,
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      });
  
    } catch (error) {
      next(error);
    }
  });
  




router.delete('/bookings/:bookingId', requireAuth, async (req, res, next) => {
    try {
      const { bookingId } = req.params;
      const userId = req.user.id;
  
      const booking = await Booking.findByPk(bookingId, {
        include: {
          model: Spot,
          attributes: ['ownerId'] // Include the spot's ownerId for authorization
        }
      });
  
      if (!booking) {
        return res.status(404).json({
          message: "Booking couldn't be found"
        });
      }
  
      if (booking.userId !== userId && booking.Spot.ownerId !== userId) {
        return res.status(403).json({
          message: 'Forbidden: You cannot delete this booking'
        });
      }
  
      const currentDate = new Date();
      if (new Date(booking.startDate) <= currentDate) {
        return res.status(400).json({
          message: "Bookings that have started or passed cannot be deleted"
        });
      }
  
      await booking.destroy();
  
      res.status(200).json({
        message: 'Booking deleted successfully'
      });
  
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router;
