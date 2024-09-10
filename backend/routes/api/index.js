const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

router.use(restoreUser);

router.delete('/spot-images/:imageId', requireAuth, async (req, res, next) => {
  try {
    const { imageId } = req.params;

    const spot = await Spot.findByPk(req.user.id);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const image = await SpotImage.findOne({
      where: { id: imageId, spotId: req.user.id }
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

router.delete('/review-images/:imageId', requireAuth, async (req, res, next) => {
  try {
    const { imageId } = req.params;

    const image = await ReviewImage.findByPk(imageId);

    if (!image) {
      return res.status(404).json({
        message: "Image couldn't be found"
      });
    }

    const review = await Review.findByPk(image.reviewId);
    
    if (review.userId !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden"
      })
    }

    await image.destroy();

    res.status(200).json({
      message: 'Image deleted successfully'
    });

  } catch (error) {
    next(error);
  }
});

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);

router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});

router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
});

module.exports = router;