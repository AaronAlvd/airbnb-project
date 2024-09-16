const express = require('express');
const { requireAuth } = require('../../utils/auth.js');
const { Op } = require('sequelize');
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
              required: false  
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

router.put('/:bookingId', requireAuth, async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    if (start >= end) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const booking = await Booking.findByPk(bookingId, {
      include: {
        model: Spot,
        attributes: ['id']
      }
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const currentDate = new Date();
    if (end < currentDate) {
      return res.status(400).json({ message: "Past bookings cannot be edited" });
    }

    const existingBooking = await Booking.findOne({
      where: {
        spotId: booking.spotId,
        id: { [Op.ne]: bookingId }, 
        [Op.or]: [
          {
            startDate: { [Op.between]: [startDate, endDate] }
          },
          {
            endDate: { [Op.between]: [startDate, endDate] }
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: startDate } },
              { endDate: { [Op.gte]: endDate } }
            ]
          }
        ]
      }
    });

    if (existingBooking) {
      return res.status(403).json({ message: "Another booking already exists for the spot on the selected dates" });
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

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  try {
      const { bookingId } = req.params;
      const userId = req.user.id;

      const booking = await Booking.findByPk(bookingId, {
          include: {
              model: Spot,
              attributes: ['id']
          }
      });

      if (!booking) {
          return res.status(404).json({
              message: "Booking couldn't be found"
          });
      }

      if (booking.userId !== userId && booking.Spot.ownerId !== userId) {
          return res.status(403).json({
              message: 'Forbidden'
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
